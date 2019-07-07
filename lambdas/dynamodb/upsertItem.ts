import { getDocumentClient } from './DynamoDbClient';
import { DbConstants } from './DbConstants';

export const upsertItem = async (key: string, data: any): Promise<void> => {
  const docClient = getDocumentClient();

  // params is supposed to of type AWS.DynamoDB.UpdateItemInput but the Key property type appears to be incorrect
  const params = {
    TableName: DbConstants.TableName,
    Key: {
      [DbConstants.UserId] : key
    },
    UpdateExpression: 'set recipes = :r, mealPlans = :m',
    ExpressionAttributeValues: {
      ':r': data.recipes,
      ':m': data.mealPlans
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await docClient.update(params).promise();
    console.log(`Added item: ${JSON.stringify(result, null, 2)}`);
  } catch (err) {
    console.log(`Unable to add item. Error JSON: ${JSON.stringify(err, null, 2)}`);
  }
};
