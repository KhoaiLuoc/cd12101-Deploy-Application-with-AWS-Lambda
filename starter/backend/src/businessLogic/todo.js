import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as uuid from 'uuid'
import { getAll, create } from '../dataLayer/todosAccess.js'
// import { AttachmentUtils } from './attachmentUtils'
// import { TodoItem } from '../models/TodoItem'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger.mjs'

const url_expiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const s3_bucket_name = process.env.ATTACHMENT_S3_BUCKET

const logger = createLogger('todo')

export async function createTodo(newItem, userId) {
  logger.info('Call function create todos')
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const s3AttachUrl = `https://${s3_bucket_name}.s3.amazoneaws.com/"${todoId}`
  const saveItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: s3AttachUrl,
    ...newItem
  }
  return create(saveItem)
}

export async function getTodosForUser(userId) {
  logger.info(`${userId} call getTodosForUser `)
  return getAll(userId)
}

// export async function UpdateTodo(
//   userId: string,
//   todoId: string,
//   updatedTodo: UpdateTodoRequest
// ): Promise<TodoItem> {
//   logger.info('Call function update todos')
//   return await todosAccess.update(userId, todoId, updatedTodo)
// }

// export async function DeleteTodo(
//   userId: string,
//   todoId: string
// ): Promise<String> {
//   logger.info('Call function delete todos')
//   return await todosAccess.delete(userId, todoId)
// }

// export async function createAttachmentPresignedUrl(
//   userId: string,
//   todoId: string
// ): Promise<String> {
//   logger.info('Call function createAttachmentPresignedUrl todos by' + userId)
//   const uploadUrl = todosAccess.getUploadUrl(todoId, userId)
//   return uploadUrl
// }

export async function getUploadUrl(todoId) {
  const s3Client2 = new S3Client()
  const command = new PutObjectCommand({
    Bucket: s3_bucket_name,
    Key: todoId
  })
  const url = await getSignedUrl(s3Client2, command, {
    expiresIn: url_expiration
  })

  return url
}
