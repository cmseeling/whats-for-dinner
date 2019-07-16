import { Identity } from './NetlifyFunctionContextIdentity';
import { User } from './NetlifyFunctionContextUser';

export interface NetlifyFunctionContext {
  clientContext: ClientContext;
}

interface ClientContext {
  identity: Identity;
  user: User;
}
