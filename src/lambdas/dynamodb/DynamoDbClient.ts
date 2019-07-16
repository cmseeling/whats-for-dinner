import AWS from 'aws-sdk';
import { clientOptions } from './config';

export const getDynamoDbClient = (): AWS.DynamoDB => {
  return new AWS.DynamoDB(clientOptions);
};

export const getDocumentClient = (): AWS.DynamoDB.DocumentClient => {
  return new AWS.DynamoDB.DocumentClient(clientOptions);
};
