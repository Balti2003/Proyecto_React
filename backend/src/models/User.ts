import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  passwordHash: string;
}

const users: User[] = [];

export const createUser = async (email: string, password: string): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    email,
    passwordHash,
  };
  users.push(newUser);
  return newUser;

};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
  return await bcrypt.compare(password, user.passwordHash);
};

