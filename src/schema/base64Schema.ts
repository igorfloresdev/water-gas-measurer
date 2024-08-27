import { z } from 'zod'

const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

export const base64Schema = z.string().refine((value) => base64Regex.test(value), 'Invalid Base64 string')
