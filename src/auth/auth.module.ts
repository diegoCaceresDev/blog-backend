import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '5m' },
    }),
    forwardRef(() => UserModule), // Asegúrate de usar forwardRef en caso de dependencia circular
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
