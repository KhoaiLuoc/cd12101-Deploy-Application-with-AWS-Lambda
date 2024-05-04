import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { DeleteTodo } from '../../businessLogic/todo.js'
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
      const result = await DeleteTodo(userId, todoId)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ result: result })
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
