import { getDynamoDbClient } from './DynamoDbClient';
import { DbConstants } from './DbConstants';
import { DynamoDB } from 'aws-sdk';

// this should only ever be run in a development environment
export const ensureTableExists = async (): Promise<void> => {
  const dynamodb = getDynamoDbClient();

  const descriptionParams: DynamoDB.DescribeTableInput = {
    TableName: DbConstants.TableName
  };
  try {
    await dynamodb.describeTable(descriptionParams).promise();
  } catch (describeError) {
    const params: AWS.DynamoDB.CreateTableInput = {
      TableName: DbConstants.TableName,
      KeySchema: [
        { AttributeName: DbConstants.UserId, KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: DbConstants.UserId, AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    try {
      const result = await dynamodb.createTable(params).promise();
      console.log(`Created table. Table description JSON: ${JSON.stringify(result, null, 2)}`);
    } catch (err) {
      console.log(`Unable to create table. Error JSON: ${JSON.stringify(err, null, 2)}`);
    }
  }
};
