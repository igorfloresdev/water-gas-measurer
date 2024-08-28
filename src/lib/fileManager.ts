import { GoogleAIFileManager } from '@google/generative-ai/server'
import path from 'path'
import fs from 'fs'

export const fileManager = async (base64: string, customerCode: string) => {
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string)

  const imageBuffer = Buffer.from(base64, 'base64')

  const timestamp = Date.now()

  const metadata = {
    mimeType: 'image/jpeg',
    displayName: `measure_${customerCode}_${timestamp}`,
  }

  const tempFilePath = path.join('tmp/', `measure_${customerCode}_${timestamp}.jpg`)

  fs.writeFileSync(tempFilePath, imageBuffer)

  const file = await fileManager.uploadFile(tempFilePath, metadata)
  return file
}
