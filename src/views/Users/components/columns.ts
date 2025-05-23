import { h } from 'vue'
import type { User } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import Button from '@/components/ui/button/Button.vue'
import { ArrowDown } from 'lucide-vue-next'
import Actions from './Actions.vue'

export const columns: ColumnDef<User | Record<string, any>>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Name', h(ArrowDown, { class: 'ml-2 h-4 w-4' })],
      ),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('name'))
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Email', h(ArrowDown, { class: 'ml-2 h-4 w-4' })],
      ),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('email'))
    },
  },

  {
    accessorKey: 'roles',
    header: () => h('div', { class: '' }, 'Roles'),
    cell: ({ row }) => {
      const roles = row.getValue('roles') as string[]

      return h('div', { class: 'font-medium' }, roles.join(', '))
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: '' }, 'Actions'),
    cell: ({ row }) => {
      const id = row.original.id
      return h('div', { class: '' }, h(Actions, { user: row.original }))
    },
  },
]
