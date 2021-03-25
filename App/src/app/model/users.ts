export class User {
  id: string;                       //user ID
  name: string;                     //user Name
  email: string;                    //user Email
  password: string;                 //user Password
  constructor (id: string, email: string, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}



