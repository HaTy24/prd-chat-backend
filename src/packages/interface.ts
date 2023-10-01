export interface AppRequest extends Request {
  user: {
    id: string;
    firstName: string;
    lastname: string;
    exp: number;
    iat: number;
  };
}
