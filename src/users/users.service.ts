import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRoles } from './user-roles'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  listAll() {
    return this.prismaService.user.findMany()
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } })
  }

  findOne(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number' ? { id: idOrEmail } : { email: idOrEmail })
      }
    })
  }

  createCommonUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER]
      }
    })
  }

  createPartnerUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER]
      }
    })
  }
}
