import { getDocumentClient } from './DynamoDbClient';
import { DbConstants } from './DbConstants';

export const getItem = async (key: string): Promise<void> => {
  const docClient = getDocumentClient();

  // params is supposed to of type AWS.DynamoDB.GetItemInput but the Key property type appears to be incorrect
  const params = {
    TableName: DbConstants.TableName,
    Key: {
      [DbConstants.UserId] : key
    }
  };

  try {
    const result = await docClient.get(params).promise();
    console.log(`Retrieved item: ${JSON.stringify(result, null, 2)}`);
  } catch (err) {
    console.log(`Unable to read item. Error JSON: ${JSON.stringify(err, null, 2)}`);
  }
};
