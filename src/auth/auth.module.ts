import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'), // Usa ConfigService para obtener el JWT_KEY
        signOptions: { expiresIn: '5m' },
      }),
    }),
    ConfigModule,
    forwardRef(() => UserModule), // Asegúrate de usar forwardRef en caso de dependencia circular
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
