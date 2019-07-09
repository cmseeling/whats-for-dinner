import { Identity } from './NetlifyFunctionContextIdentity';
import { User } from './NetlifyFunctionContextUser';

export interface NetlifyFunctionContext {
  clientContext: {
    identity: Identity,
    user: User
  };
}
