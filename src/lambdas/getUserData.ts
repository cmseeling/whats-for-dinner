import { APIGatewayEvent } from 'aws-lambda';

export async function handler(event: APIGatewayEvent, context: any) {
  if (!context.clientContext && !context.clientContext.identity) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg:
          'No identity instance detected. Did you enable it?'
      }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
  const { identity, user } = context.clientContext;

  return {
    statusCode: 200,
    body: JSON.stringify({
      identity,
      user,
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
