import { APIGatewayEvent } from 'aws-lambda';
import { NetlifyFunctionContext } from './models/NetlifyFunctionContext';
import { getItem } from './dynamodb/getItem';
import { UserEntry } from './models/UserEntry';
import { CreateTable } from './dynamodb/config';
import { ensureTableExists } from './dynamodb/ensureTableExists';

export async function handler(event: APIGatewayEvent, context: NetlifyFunctionContext) {
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
    if (CreateTable) {
      await ensureTableExists();
    }

    const rawResult = await getItem(user.sub);
    const result: UserEntry = {UserId: (rawResult as any).UserId};
    if (rawResult.recipes) {
      result.recipes = JSON.parse(rawResult.recipes);
    } else {
      result.recipes = [];
    }
    if (rawResult.mealPlans) {
      result.mealPlans = JSON.parse(rawResult.mealPlans);
    } else {
      result.mealPlans = [];
    }

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
}
