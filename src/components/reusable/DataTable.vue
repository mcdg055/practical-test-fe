<script setup lang="ts">
import { type ColumnDef, type SortingState } from '@tanstack/vue-table'
import { useDebounceFn } from '@vueuse/core'
import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel } from '@tanstack/vue-table'
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
import { valueUpdater } from '@/lib/utils'
import DataTablePagination from '@/components/ui/table/DataTablePagination.vue'
import type { TablePagination } from '@/types'

const {
  data: tableData,
  tableColumns,
  pagination,
  loading,
  handleFetchData,
} = defineProps<{
  data: Record<string, any>[]
  tableColumns: ColumnDef<Record<string, any>>[]
  pagination: TablePagination
  loading: boolean
  handleFetchData: (params: TablePagination) => void
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return tableData
  },
  get columns() {
    return tableColumns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  manualPagination: true,
  state: {
    get sorting() {
      return sorting.value
    },
  },
})

const onPageChange = (page: number) => {
  handleFetchData({
    page: page,
    perPage: pagination.perPage,
  })
}

const onPageSizeChange = (pageSize: number) => {
  handleFetchData({
    page: 1,
    perPage: pageSize,
  })
}

const handleSearch = (keyword: string) => {
  if (keyword.length < 3 && keyword) return
  handleFetchData({
    page: 1,
    perPage: pagination.perPage,
    search: keyword,
  })
}

const handleDebounceSearch = useDebounceFn(
  (event: Event) =>
    handleFetchData({
      page: 1,
      perPage: pagination.perPage,
      search: (event.target as HTMLInputElement).value,
    }),
  1000,
)
</script>

<template>
  <div>
    <div class="flex items-center py-4 justify-between">
      <Input
        class="flex-grow max-w-sm"
        @input="handleDebounceSearch"
        placeholder="Search by name or email..."
      />
      <div>
        <slot name="actions" />
      </div>
    </div>
    <Skeleton v-if="loading" class="h-[300px]" />
    <div v-else class="border border-gray-200 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              class="border-b border-gray-200 dark:border-gray-700"
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
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
              class="border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
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
      <DataTablePagination
        :pagination="pagination"
        :on-page-change="onPageChange"
        :on-page-size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>
