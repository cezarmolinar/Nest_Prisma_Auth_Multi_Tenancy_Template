import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PartnerUsersController } from './partner-users/partner-users.controller'
import { UsersService } from './users/users.service'
import { PartnersModule } from './partners/partners.module'
import { EventsModule } from './events/events.module'
import { TenantModule } from './tenant/tenant.module'

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PartnersModule, EventsModule, TenantModule],
  controllers: [AppController, PartnerUsersController],
  providers: [AppService, UsersService]
})
export class AppModule {}
