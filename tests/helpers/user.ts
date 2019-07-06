import { User } from 'netlify-identity-widget';

export function generateUser({id = 'userId1', email = 'test@test.com', fullName = 'test user', role = ''} =
      {
        id: 'userId1',
        email: 'test@test.com',
        fullName: 'test user',
        role: ''
      }): User {
  return {
    api: {
      _sameOrigin: undefined,
      apiURL: '',
      defaultHeaders: {}
    },
    app_metadata: {
      provider: ''
    },
    aud: '',
    audience: null,
    confirmed_at: '',
    created_at: '',
    email,
    id,
    role,
    token: undefined,
    updated_at: '',
    url: '',
    user_metadata: {
      avatar_url: '',
      full_name: fullName
    }
  };
}
