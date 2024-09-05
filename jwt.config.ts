import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'defaultSecretKey',
  signOptions: {
    expiresIn: '100h', // Token expiration time
  },
}));
