import { compare, hash } from "bcryptjs";

const saltRounds = 12;

async function hashPassword(password: string): Promise<string> {
  return hash(password, saltRounds);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}
