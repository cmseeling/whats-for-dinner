import { getItem } from '@/lambdas/dynamodb/getItem';
import DynamoDbClient from '@/lambdas/dynamodb/DynamoDbClient';
import { DbConstants } from '@/lambdas/dynamodb/DbConstants';

const mockGet = jest.fn().mockImplementation((params) => {
  return {
    promise: jest.fn()
  };
});

jest.spyOn(DynamoDbClient, 'getDocumentClient').mockImplementation(() => {
  return {
    get: mockGet,
    batchGet: jest.fn(),
    batchWrite: jest.fn(),
    createSet: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
    query: jest.fn(),
    scan: jest.fn(),
    transactGet: jest.fn(),
    transactWrite: jest.fn(),
    update: jest.fn()
  };
});

describe('getItem.ts', () => {
  it('gets the item based on key', () => {
    const key = 'test';
    const expectedParams = {
      TableName: DbConstants.TableName,
      Key: {
        [DbConstants.UserId] : key
      }
    };

    getItem(key);

    expect(mockGet).toHaveBeenCalledWith(expectedParams);
  });
});
