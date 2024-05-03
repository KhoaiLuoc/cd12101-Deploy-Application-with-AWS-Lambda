const items = [
  {
    todoId: '605525c4-d36c-1234-b3ff-65b853344123',
    userId: 'google-oauth2|115783759495544745774',
    attachmentUrl:
      'https://serverless-c4-todo-images.s3.amazonaws.com/605525c4-1234-4d23-b3ff-65b853344123',
    dueDate: '2022-12-12',
    createdAt: '2022-11-28T22:04:08.613Z',
    name: 'Buy bread',
    done: false
  }
]
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { getTodosForUser } from '../../businessLogic/todo.js'

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

// export const handler = middy()
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )
//   .handler(async (event) => {
//     // Write your logic here
//     throw new createError.UnprocessableEntity()
//     return {
//       statusCode: 200,
//       // headers: {
//       //   'Access-Control-Allow-Origin': '*',
//       //   'Content-Type': 'application/json'
//       // },
//       body: JSON.stringify({ message: 'Hello World!3333333333333333333' })
//     }
//   })

// handler({}, {}, (_, response) => {
//   t.deepEqual(response, {
//     statusCode: 422,
//     body: JSON.stringify({ error: 'ERRRRRRRRRRRRooo' })
//   })
// })

export async function handler(event) {
  console.log('Event: ', event)
  const abcc = await getTodosForUser()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(abcc)
  }
}
