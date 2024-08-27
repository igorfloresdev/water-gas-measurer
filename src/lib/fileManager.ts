import { GoogleAIFileManager } from '@google/generative-ai/dist/server/server'
import path from 'path'
import fs from 'fs'

export const fileManager = async (base64: string, customerCode: string) => {
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string)

  const imageBuffer = Buffer.from(base64, 'base64')

  const metadata = {
    mimeType: 'image/jpeg',
    displayName: `measure_${customerCode}_${Date()}`,
  }

  const tempFilePath = path.join('/tmp', 'temp_image.jpg')

  fs.writeFileSync(tempFilePath, imageBuffer)

  const file = await fileManager.uploadFile(tempFilePath, metadata)
  return file
}
