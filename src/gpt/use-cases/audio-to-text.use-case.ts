import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (
  openai: OpenAI,
  { prompt, audioFile }: Options,
) => {
  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, //same languages of audio
    language: 'es',
    response_format: 'verbose_json', //'vtt',
  });

  console.log(response);

  return response;
};
