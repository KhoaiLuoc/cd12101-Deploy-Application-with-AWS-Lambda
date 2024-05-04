import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { getTodosForUser, getUploadUrl } from '../../businessLogic/todo.js'
import { getUserId } from '../utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    try {
      const userId = getUserId(event)
      const todoId = event.pathParameters.todoId
      const url = await getUploadUrl(todoId)
      return {
        statusCode: 201,
        body: JSON.stringify({ uploadUrl: url })
      }
    } catch (error) {
      throw createError(
        500,
        JSON.stringify({
          error: error
        })
      )
    }
  })
