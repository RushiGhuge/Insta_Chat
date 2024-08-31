import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.cookies['jwt'];
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token);
        req.user = payload; // Attach user payload to request object
      } catch (err) {
        this.logger.error('Invalid token', err);
      }
    }
    next();
  }
}
