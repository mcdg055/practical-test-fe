import { h } from 'vue'
import type { IPAddress } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import Button from '@/components/ui/button/Button.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import Actions from './Actions.vue'

interface Row {
  getValue: (key: string) => IPAddress | undefined
  original: IPAddress | Record<string, any>
}

export const columns: ColumnDef<IPAddress | Record<string, any>>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) =>
      h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Type', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      ),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('type'))
    },
  },

  {
    accessorKey: 'ip',
    header: () => h('div', { class: '' }, 'IP Address'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('ip'))
    },
  },
  {
    accessorKey: 'label',
    header: ({ column }) =>
      h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Label', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      ),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('label'))
    },
  },
  {
    accessorKey: 'user',
    header: () => h('div', { class: '' }, 'user'),
    cell: ({ row }: { row: Row }) => {
      return h('div', { class: 'font-medium' }, row.original.user.name)
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: '' }, 'Actions'),
    cell: ({ row }: { row: Row }) => {
      const id = row.original.id
      return h('div', { class: '' }, h(Actions, { user: row.original }))
    },
  },
]
