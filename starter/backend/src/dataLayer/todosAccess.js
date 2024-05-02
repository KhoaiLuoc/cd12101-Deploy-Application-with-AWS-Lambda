// import * as AWS from "aws-sdk";
// const AWSXRay = require("aws-xray-sdk");
// import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from '../utils/logger.mjs'
// import { TodoItem } from "../models/TodoItem";
// import { TodoUpdate } from "../models/TodoUpdate";
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())

const logger = createLogger('todosAccess')

const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_CREATED_AT_INDEX

export async function getAll(userId) {
  logger.info('Call function getall ', Date.now())
  const result = await dynamoDbClient.scan({
    TableName: todosTable
  })

  const items = result.Items
  console.log('ITEM ', items)
  return items
}

//   async create(item: TodoItem): Promise<TodoItem> {
//     logger.info("Call function create");
//     await this.docClient
//       .put({
//         TableName: this.todosTable,
//         Item: item,
//       })
//       .promise();
//     return item as TodoItem;
//   }

//   async update(
//     userId: string,
//     todoId: string,
//     todoUpdate: TodoUpdate
//   ): Promise<TodoItem> {
//     logger.info(`Updating todo item ${todoId} in ${this.todosTable}`);
//     try {
//       await this.docClient
//         .update({
//           TableName: this.todosTable,
//           Key: {
//             userId,
//             todoId,
//           },
//           UpdateExpression:
//             "set #name = :name, #dueDate = :dueDate, #done = :done",
//           ExpressionAttributeNames: {
//             "#name": "name",
//             "#dueDate": "dueDate",
//             "#done": "done",
//           },
//           ExpressionAttributeValues: {
//             ":name": todoUpdate.name,
//             ":dueDate": todoUpdate.dueDate,
//             ":done": todoUpdate.done,
//           },
//           ReturnValues: "UPDATED_NEW",
//         })
//         .promise();
//     } catch (error) {
//       logger.error("Error =======> updating Todo.", {
//         error: error,
//         data: {
//           todoId,
//           userId,
//           todoUpdate,
//         },
//       });
//       throw Error(error);
//     }
//     return todoUpdate as TodoItem;
//   }
//   async delete(userId: string, todoId: string): Promise<String> {
//     logger.info(`Deleting todo item ${todoId} from ${this.todosTable}`);
//     try {
//       await this.docClient
//         .delete({
//           TableName: this.todosTable,
//           Key: {
//             userId,
//             todoId,
//           },
//         })
//         .promise();
//       return "success";
//     } catch (e) {
//       logger.info("Error ==>>", {
//         error: e,
//       });
//       return "Error";
//     }
//   }
//   async getUploadUrl(todoId: string, userId: string): Promise<string> {
//     const uploadUrl = this.S3.getSignedUrl("putObject", {
//       Bucket: this.bucket_name,
//       Key: todoId,
//       Expires: Number(url_expiration),
//     });
//     await this.docClient
//       .update({
//         TableName: this.todosTable,
//         Key: {
//           userId,
//           todoId,
//         },
//         UpdateExpression: "set attachmentUrl = :URL",
//         ExpressionAttributeValues: {
//           ":URL": uploadUrl.split("?")[0],
//         },
//         ReturnValues: "UPDATED_NEW",
//       })
//       .promise();
//     return uploadUrl;
//   }
// }

// function createDynamoDBClient() {
//   if (process.env.IS_OFFLINE) {
//     console.log("Creating a local DynamoDB instance");
//     return new XAWS.DynamoDB.DocumentClient({
//       region: "localhost",
//       endpoint: "http://localhost:8000",
//     });
//   }

//   return new XAWS.DynamoDB.DocumentClient();
// }
