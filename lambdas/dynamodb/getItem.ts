import { getDocumentClient } from './DynamoDbClient';
import { DbConstants } from './DbConstants';
import { UserEntry } from '../models/UserEntry';

export const getItem = async (key: string): Promise<UserEntry> => {
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
    return result.Item ? result.Item : {};
  } catch (err) {
    throw err;
  }
};
