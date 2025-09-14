
export interface User {
  name: string;
  email: string;
  password?: string; // Password is optional for security reasons in the context
}

// In-memory "database" for users.
// In a real application, this would be a proper database.
const users: User[] = [
    {
        name: 'Asha Kumari',
        email: 'asha.kumari@example.com',
        password: 'password123'
    }
];

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: User): void {
  if (findUserByEmail(user.email)) {
    throw new Error('User with this email already exists.');
  }
  users.push(user);
}
