import { APIGatewayEvent } from 'aws-lambda';
import { NetlifyFunctionContext } from '../models/NetlifyFunctionContext';
import { upsertItem } from '../dynamodb/upsertItem';

export function createSaveFunctionHandler(dynamoTopLevelAttribute: string) {
  return async function handler(event: APIGatewayEvent, context: NetlifyFunctionContext) {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 404
      };
    }
    if (!context.clientContext && !context.clientContext.identity) {
      console.log('could not find identity context');
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'No identity instance detected. Did you enable it?'
        })
      };
    }
    const user = context.clientContext.user;

    try {
      const result = await upsertItem(user.sub, dynamoTopLevelAttribute, event.body);
      console.log(result);
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
  };
}
