import { SetMetadata } from '@nestjs/common'
import { UserRoles } from 'src/users/user-roles'

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args)
