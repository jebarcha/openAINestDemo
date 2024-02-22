import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: `
          Traduce el siguiente texto al idioma ${lang}:${prompt}
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    //max_tokens: 500,
    // response_format: {
    //   type: 'json_object', // este formato no es soportado por todos los model e.g. gpt-4 no lo soporta
    // },
    //max_tokens: 1
  });

  //return response.choices[0].message.content;
  return { message: response.choices[0].message.content };
};
