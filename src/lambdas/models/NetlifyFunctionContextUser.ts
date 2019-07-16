export interface UserAppMetadata {
  provider: string;
}

export interface UserMetadata {
  full_name: string;
}

export interface User {
  app_metadata: UserAppMetadata;
  email: string;
  exp: number;
  // sub is equivalent to user id;
  sub: string;
  user_metadata: UserMetadata;
}
