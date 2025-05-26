import { createMongoAbility, type MongoAbility } from '@casl/ability'

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'update own' | 'delete' | 'view'

export type Subjects = 'User' | 'IPAddress' | 'Activity' | 'audit dashboard' | 'all'

export type AppAbility = MongoAbility<[Actions, Subjects]>
export const ability = createMongoAbility<[Actions, Subjects]>()
