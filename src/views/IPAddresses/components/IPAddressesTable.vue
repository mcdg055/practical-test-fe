<script setup lang="ts" generic="TData, TValue">
import { columns as tableColumns } from './columns'
import { useUsersStore } from '@/stores/users'
import { Plus } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'
import { storeToRefs } from 'pinia'

import { fetchUsersService } from '@/services/userService'
import { type TablePagination } from '@/types'
import DataTable from '@/components/reusable/DataTable.vue'
import Button2 from '@/components/ui/button/Button2.vue'
import { useIPAddressStore } from '@/stores/useIPAddressStore'

const { open } = useGlobalModal()

const ipAddressStore = useIPAddressStore()

const { ipAddresses } = storeToRefs(ipAddressStore)

function handleAddIpAddress() {}

function handleSearch(keyword: string) {
  if (keyword.length < 3 && keyword) return
}
</script>

<template>
  <DataTable
    :data="ipAddresses"
    :table-columns="tableColumns"
    :loading="ipAddressStore.loading.ipAddresses"
    :pagination="ipAddressStore.pagination"
    :handle-fetch-data="fetchUsersService"
  >
    <template #actions>
      <Button2 class="min-w-[100px]" @click="handleAddIpAddress">
        <Plus class="w-4 h-4" />
        Add</Button2
      >
    </template>
  </DataTable>
</template>
