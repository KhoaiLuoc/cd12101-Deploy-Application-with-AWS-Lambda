import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { getTodosForUser } from '../../businessLogic/todo.js'
import { getUserId } from '../utils.mjs'

// export function handler(event, context, callback) {
//   // TODO: Get all TODO items for a current user
//   console.log('HHHEELOO ', Date.now())
//   // return {
//   //   result: `Hello ${event.name} ${Date.now()}!`
//   // }

//   const response = {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ message: 'Hello World!' })
//   }

//   callback(null, response)
// }

// export const handler = (event) => {
//   // TODO: Get all TODO items for a current user
//   console.log('HHHEELOO GGGGGGGZZZZ ', Date.now())
//   // return {
//   //   result: `Hello ${event.name} ${Date.now()}!`
//   // }

//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ message: 'Hello World!' })
//   }
// }

// export const handler = async (event) => {
//   console.log('Event: ', event)

//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ message: 'Hello World!111111111' })
//   }
// }

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
      const todos = await getTodosForUser(userId)
      return {
        statusCode: 200,
        body: JSON.stringify({ items: todos })
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

// handler({}, {}, (_, response) => {
//   t.deepEqual(response, {
//     statusCode: 422,
//     body: JSON.stringify({ error: 'ERRRRRRRRRRRRooo' })
//   })
// })

// export async function handler(event) {
//   console.log('Event: ', event)
//   const abcc = await getTodosForUser()
//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(abcc)
//   }
// }
