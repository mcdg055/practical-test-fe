<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TablePagination } from '@/types'
import type { AcceptableValue } from 'reka-ui'

interface DataTablePaginationProps {
  pagination: TablePagination
  onPageChange: (page: number | null | undefined) => void
  onPageSizeChange: (pageSize: number) => void
}
const props = defineProps<DataTablePaginationProps>()

const handlePageSizeChange = (size: AcceptableValue) => {
  props.onPageSizeChange(Number(size))
}

const handlePageChange = (page: number | null | undefined) => {
  props.onPageChange(page)
}
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
        <Select :model-value="`${pagination.perPage}`" @update:model-value="handlePageSizeChange">
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pagination.perPage}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ pagination.page }} of
        {{ pagination.totalPages }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!pagination.firstPage"
          @click="handlePageChange(pagination.firstPage)"
        >
          <span class="sr-only">Go to first page</span>
          <ArrowLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!pagination.prevPage"
          @click="handlePageChange(pagination.prevPage)"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!pagination.nextPage"
          @click="handlePageChange(pagination.nextPage)"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!pagination.lastPage"
          @click="handlePageChange(pagination.lastPage)"
        >
          <span class="sr-only">Go to last page</span>
          <ArrowRightIcon class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
