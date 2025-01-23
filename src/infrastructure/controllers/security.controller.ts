import { Body, Controller, Post } from '@nestjs/common';
import { Application } from 'src/application/application.interface';
import { JwtService } from '../services/jwt.service';
import { PasswordHashDomainService } from '../services/password-hash.service';
import { UserService } from '../services/user.service';
import { UuidService } from '../services/uuid.service';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly application: Application,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly uuidService: UuidService,
    private readonly passwordHashService: PasswordHashDomainService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    try {
      const data = await this.application.newUser(
        body.name,
        body.email,
        body.password,
        this.uuidService,
        this.passwordHashService,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const data = await this.application.signIn(
        body.email,
        body.password,
        this.jwtService,
        this.userService,
        this.passwordHashService,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
