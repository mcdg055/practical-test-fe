// src/casl/defineAbilities.ts
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { AppAbility, Actions, Subjects } from './ability'
import type { User } from '@/types'

export function defineAbilitiesFromRolesAndPermissions(
  roles: string[],
  permissions: string[],
  user: User | null,
) {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (roles.includes('Super Admin')) {
    can('manage', 'all')
  } else {
    permissions.forEach((permission) => {
      const [action, subject] = permission.split(' ') as [Actions, Subjects]

      if (!action || !subject) return

      if ((action === 'update' || action === 'delete') && subject === 'IPAddress') {
        can(action, subject, { user_id: user?.id })
      } else {
        can(action, subject)
      }
    })
  }

  return createMongoAbility<[Actions, Subjects]>(rules)
}
