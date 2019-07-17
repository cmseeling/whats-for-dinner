import DynamoDbClient from './DynamoDbClient';
import { DbConstants } from './DbConstants';

export const upsertItem = async (key: string, property: string, data: any): Promise<object> => {
  const docClient = DynamoDbClient.getDocumentClient();

  // params is supposed to of type AWS.DynamoDB.UpdateItemInput but the Key property type appears to be incorrect
  const params = {
    TableName: DbConstants.TableName,
    Key: {
      [DbConstants.UserId] : key
    },
    UpdateExpression: `set ${property} = :p`,
    ExpressionAttributeValues: {
      ':p': data
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await docClient.update(params).promise();
    return result.Attributes ? result.Attributes : {};
  } catch (err) {
    throw err;
  }
};
