import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // const token = this.jwtService.sign({
    //   userId: user.id,
    //   email: user.email
    // })

    // return { accessToken: token }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return {
      access_token: this.jwtService.sign(result)
    }
  }
}
