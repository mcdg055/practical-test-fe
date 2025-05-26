import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { AppAbility, Actions, Subjects } from './ability.ts'
import { ROLE_SUPER_ADMIN } from '@/constants/index.ts'

export function defineAbilitiesFromRolesAndPermissions(roles: string[], permissions: string[]) {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (roles.includes(ROLE_SUPER_ADMIN)) {
    can('manage', 'all')
  } else {
    permissions.forEach((permission) => {
      const [action, subject] = permission.split(' ') as [Actions, Subjects]
      if (action && subject) {
        can(action, subject)
      }
    })
  }

  return createMongoAbility<[Actions, Subjects]>(rules)
}
