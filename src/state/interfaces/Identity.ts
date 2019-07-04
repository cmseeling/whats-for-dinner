import { User } from 'netlify-identity-widget';

export interface IdentityState {
  User: User|null;
}

export const DefaultIdentityState = (): IdentityState => {
  return {
    User: null
  };
};
