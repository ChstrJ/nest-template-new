import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';

const config = new ConfigService();

export const signAccessToken = (payload: object) => {
  return jwt.sign({ ...payload, jti: randomUUID() }, config.get('JWT_SECRET'), { expiresIn: '1d' });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign({ ...payload, jti: randomUUID() }, config.get('JWT_SECRET'), { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.get('JWT_SECRET'));
};
