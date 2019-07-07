import { LambdaFetchResponse } from '@/models/LambdaFetchResponse';
import { User } from 'netlify-identity-widget';

export const getData = async (user: User): Promise<LambdaFetchResponse> => {
  const request = createRequest(user);
  const response = await fetch(request);
  return await response.json();
};

const createRequest = (user: User): Request => {
  const headers = new Headers();
  if (user.token) {
    headers.append('authorization', `Bearer ${user.token.access_token}`);
  }
  return new Request('/.netlify/functions/getUserData', {headers});
}
