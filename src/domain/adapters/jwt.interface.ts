export interface IJwtServicePayload {
  username: string;
  password: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload, secret: string): string;
}
