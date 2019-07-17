import { upsertItem } from '@/lambdas/dynamodb/upsertItem';
import DynamoDbClient from '@/lambdas/dynamodb/DynamoDbClient';
import { DbConstants } from '@/lambdas/dynamodb/DbConstants';

const mockUpdate = jest.fn().mockImplementation((params) => {
  return {
    promise: jest.fn()
  };
});

jest.spyOn(DynamoDbClient, 'getDocumentClient').mockImplementation(() => {
  return {
    get: jest.fn(),
    batchGet: jest.fn(),
    batchWrite: jest.fn(),
    createSet: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
    query: jest.fn(),
    scan: jest.fn(),
    transactGet: jest.fn(),
    transactWrite: jest.fn(),
    update: mockUpdate
  };
});

describe('upsertItem.ts', () => {
  it('updates the item based on key and property name', () => {
    const key = 'testKey';
    const property = 'testProperty';
    const data = 'testData';
    const expectedParams = {
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

    upsertItem(key, property, data);

    expect(mockUpdate).toHaveBeenCalledWith(expectedParams);
  });
});
