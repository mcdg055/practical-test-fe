import { h } from 'vue'
import type { ActivityLog } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import ActionType from './ActionType.vue'
import Avatar from './Avatar.vue'

export const columns: ColumnDef<ActivityLog | Record<string, any>>[] = [
  {
    id: 'userAvatar',
    header: () => h('div', { class: '' }, 'User'),
    cell: ({ row }) => {
      return h('div', { class: '' }, h(Avatar, { causer: row.original.causer }))
    },
  },

  {
    accessorKey: 'description',
    header: () => h('div', { class: '' }, 'Description'),
    cell: ({ row }) => {
      return h('div', { class: '' }, row.original.description || 'N/A')
    },
  },

  {
    id: 'actionType',
    header: () => h('div', { class: '' }, 'Action Type'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: '' },
        h(ActionType, { action: row.original.properties?.type || 'N/A' }),
      )
    },
  },

  {
    accessorKey: 'created_at',
    header: () => h('div', { class: '' }, 'Timestamp'),
    cell: ({ row }) => {
      const rawDate = '2025-05-29 00:48:26'
      const date = new Date(row.original.created_at.replace(' ', 'T'))

      return h('div', { class: 'font-medium' }, date.toLocaleString() || 'N/A')
    },
  },
]
