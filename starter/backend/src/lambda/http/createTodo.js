import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { createTodo } from '../../businessLogic/todo.js'
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
      const newTodo = JSON.parse(event.body)
      const userId = getUserId(event)
      const todos = await createTodo(newTodo, userId)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ item: todos })
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
