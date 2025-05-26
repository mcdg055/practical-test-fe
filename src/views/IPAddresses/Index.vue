<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { fetchIpAddressesService } from '@/services/IPAddressService'
import { useIPAddressStore } from '@/stores/useIPAddressStore'
import { onBeforeMount } from 'vue'
import IPAddressesTable from './components/IPAddressesTable.vue'

const ipAddressStore = useIPAddressStore()

onBeforeMount(() => {
  if (!ipAddressStore.ipAddresses.length) {
    fetchIpAddressesService(ipAddressStore.pagination)
  }
})
</script>

<template>
  <AppLayout>
    <div class="bg-white drop-shadow-lg rounded-2xl p-5 mt-5">
      <div>
        <h1 class="font-bold text-lg">IP Address</h1>
      </div>
      <div>
        <IPAddressesTable />
      </div>
    </div>
  </AppLayout>
</template>
