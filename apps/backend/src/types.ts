type UserPayload = {
  // ! NOTE: modify the UserPayload type accordingly for your project if needed!
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthRequest = Request & {
  user?: UserPayload;
}; // this will bind the user object to the Request body

export type { UserPayload, AuthRequest };
