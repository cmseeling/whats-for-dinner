import AWS from 'aws-sdk';
import { clientOptions } from './config';

const getManagementClient = (): AWS.DynamoDB => {
  return new AWS.DynamoDB(clientOptions);
};

const getDocumentClient = (): AWS.DynamoDB.DocumentClient => {
  return new AWS.DynamoDB.DocumentClient(clientOptions);
};

export default {
  getManagementClient,
  getDocumentClient
};
