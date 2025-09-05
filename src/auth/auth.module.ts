import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultJwtSecret@123$456',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION || '1h',
        algorithm: 'HS256'
      }
    })
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService]
})
export class AuthModule {}
