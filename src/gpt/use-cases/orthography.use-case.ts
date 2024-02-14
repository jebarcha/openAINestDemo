import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Te seran proveidos textos en español con posibles errores ortograficos y gramaticales,
            Las palabras utilizadas deben existir en el diccionario de la Real Academia Española.
            Debes de responder en formato JSON,
            tu tarea es corregirlos y retornar informacion de soluciones,
            tambien debes de dar un porcentaje de acierto por el usuario,

            Si no hay errores, debes de retornar un mensaje de felicitaciones.

            Ejemplo de salida:
            {
              userScore: number,
              errors: string[], // ['error -> solucion']
              message: string,  // Usa emojis y texto para felicitar al usuario
            }
          
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106', //'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object', // este formato no es soportado por todos los model e.g. gpt-4 no lo soporta
    },
    //max_tokens: 1
  });

  console.log(completion);
  //console.log(completion.choices[0]);
  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
  // {
  //   prompt: prompt,
  //   apiKey: process.env.OPENAI_API_KEY,
  // };
};
