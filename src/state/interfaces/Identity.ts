import { User } from 'netlify-identity-widget';

export interface IdentityState {
  user: User|null;
}

export const DefaultIdentityState = (): IdentityState => {
  return {
    user: null
  };
};
