export interface User {
  email: string;
  id: number;
  last_login: Date;
  name: string;
  password: string;
  registration_time: string;
  status: "active" | "blocked";
  work: string;
}
