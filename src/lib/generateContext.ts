import { GoogleGenerativeAI } from '@google/generative-ai'

export const generateContext = async (mimeType: string, fileUri: string, measureType: 'WATER' | 'GAS') => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

  const model = genAI.getGenerativeModel({
    // Choose a Gemini model.
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  })

  const result = await model.generateContent([
    {
      fileData: {
        mimeType,
        fileUri,
      },
    },
    { text: `return me the value of this ${measureType.toLowerCase()} measurer in m³` },
  ])
  const resultJson = JSON.parse(result.response.text())
  return resultJson
}
