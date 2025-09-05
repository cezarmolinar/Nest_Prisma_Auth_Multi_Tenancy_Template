import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TenantService } from './tenant.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private tenantService: TenantService,
    private prismaService: PrismaService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = request.user

    const partnerUser = await this.prismaService.partnerUser.findFirst({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { userId: user.userId },
      include: { Partner: true }
    })

    if (!partnerUser) {
      throw new Error('User not have a partner')
    }

    this.tenantService.setTenant(partnerUser.Partner)

    return next.handle()
  }
}
