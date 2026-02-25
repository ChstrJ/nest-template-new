import { compare, hash } from "bcryptjs";

const saltRounds = 12;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}
