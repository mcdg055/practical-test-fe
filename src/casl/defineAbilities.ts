import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { AppAbility, Actions, Subjects } from './ability.ts'

export function defineAbilitiesFromRolesAndPermissions(roles: string[], permissions: string[]) {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (roles.includes('Super Admin')) {
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
