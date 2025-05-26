<script setup lang="ts" generic="TData, TValue">
import { columns as tableColumns } from './columns'
import { Plus } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'
import { storeToRefs } from 'pinia'

import { fetchUsersService } from '@/services/userService'
import DataTable from '@/components/reusable/DataTable.vue'
import Button2 from '@/components/ui/button/Button2.vue'
import { useIPAddressStore } from '@/stores/useIPAddressStore'
import IPAddressForm from './IPAddressForm.vue'
import { fetchIpAddressesService } from '@/services/IPAddressService'

const { open } = useGlobalModal()

const ipAddressStore = useIPAddressStore()

const { ipAddresses } = storeToRefs(ipAddressStore)

function handleAddIpAddress() {
  open({
    title: 'Add IP Address',
    description: 'Add a new IP address',
    component: IPAddressForm,
  })
}
</script>

<template>
  <DataTable
    :data="ipAddresses"
    :table-columns="tableColumns"
    :loading="ipAddressStore.loading.ipAddresses"
    :pagination="ipAddressStore.pagination"
    :handle-fetch-data="fetchIpAddressesService"
  >
    <template #actions>
      <Button2 class="min-w-[100px]" @click="handleAddIpAddress">
        <Plus class="w-4 h-4" />
        Add</Button2
      >
    </template>
  </DataTable>
</template>
