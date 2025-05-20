<script setup lang="ts" generic="TData, TValue">
import { type SortingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Input from '@/components/ui/input/Input.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import { ref } from 'vue'
import { columns as tableColumns } from './columns'
import { Button } from '@/components/ui/button'
import { valueUpdater } from '@/lib/utils'
import { useUsersStore } from '@/stores/users'
import { Loader2, Plus } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'
import AddUserForm from '@/views/Users/components/AddUserForm.vue'
import { storeToRefs } from 'pinia'
import DataTablePagination from '@/components/ui/table/DataTablePagination.vue'
const { open } = useGlobalModal()

const usersStore = useUsersStore()

const sorting = ref<SortingState>([])
const globalFilter = ref('')
const { users } = storeToRefs(usersStore)

const rerender = () => {}

const table = useVueTable({
  get data() {
    return users.value
  },
  get columns() {
    return tableColumns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilter),
  getFilteredRowModel: getFilteredRowModel(),
  manualPagination: true,
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
  },
  globalFilterFn: (row, columnId, filterValue) => {
    const search = String(filterValue).toLowerCase()
    const allowedFields = ['name', 'email'] // only filter these fields

    return allowedFields.some((field) => {
      const value = row.original[field]
      return String(value ?? '')
        .toLowerCase()
        .includes(search)
    })
  },
})

function handleAddUser() {
  open({
    title: 'Add user',
    description: 'Add a new user',
    component: AddUserForm,
    onConfirm: () => {
      rerender()
    },
  })
}
</script>

<template>
  <div>
    <div class="flex items-center py-4 justify-between">
      <Input
        class="flex-grow max-w-sm"
        v-model="globalFilter"
        @input="(event: Event) => table.setGlobalFilter(event.target.value)"
        placeholder="Search by name or email..."
      />
      <Button :disabled="usersStore.loading.roles" @click="handleAddUser" class="min-w-[100px]">
        <Loader2 v-if="usersStore.loading.roles" class="w-4 h-4 animate-spin" />
        <Plus v-else class="w-4 h-4" /> Add
      </Button>
    </div>
    <Skeleton v-if="usersStore.loading.users" class="h-[300px]" />
    <div v-else class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="tableColumns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <DataTablePagination :table="table" />
    </div>
  </div>
</template>
