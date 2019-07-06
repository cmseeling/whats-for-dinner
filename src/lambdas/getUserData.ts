import { Context, APIGatewayEvent } from 'aws-lambda';

export async function handler(event: APIGatewayEvent, context: Context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
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
