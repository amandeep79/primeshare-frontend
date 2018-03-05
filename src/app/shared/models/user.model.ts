// user model
// Adding all the properties(which you're adding to profile/register page) to this model is mandatory 

export class User {
  _id: string;
  email: string;
  token: string;
  username: string;
  phone: string;
  address: string;
  picture: string;
}
