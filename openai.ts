import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  //   apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export default openai
