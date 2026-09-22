export type UserRole = 'client' | 'business' | 'delivery';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Renso Araujo',
    email: 'renso@gmail.com',
    password: '123456',
    role: 'client',
  },
];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function findUserByCredentials(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  return users.find((user) => user.email === normalizedEmail && user.password === password);
}

export function emailIsRegistered(email: string) {
  return users.some((user) => user.email === normalizeEmail(email));
}

export function createUser(user: Omit<User, 'id'>) {
  const newUser: User = {
    ...user,
    email: normalizeEmail(user.email),
    id: `user-${Date.now()}`,
  };

  users.push(newUser);
  return newUser;
}
