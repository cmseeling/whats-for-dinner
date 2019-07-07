import { APIGatewayEvent } from 'aws-lambda';
import { clientOptions } from './dynamodb/config';

export async function handler(event: APIGatewayEvent, context: any) {
  if (!context.clientContext && !context.clientContext.identity) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg:
          'No identity instance detected. Did you enable it?'
      })
    };
  }
  const { identity, user } = context.clientContext;

  return {
    statusCode: 200,
    body: JSON.stringify({
      identity,
      user,
      clientOptions,
      recipes: [
        {
          id: 1,
          name: 'recipe 1',
          ingredients: [
            'milk',
            'eggs'
          ]
        },
        {
          id: 2,
          name: 'recipe 2',
          ingredients: [
            'butter',
            'sugar'
          ]
        }
      ],
      mealPlans: [
        {
          id: 1,
          created: '2019-05-31',
          slots: [
            {
              id: 5,
              recipeIds: [1, 2]
            }
          ]
        }
      ]
    })
  };
}
