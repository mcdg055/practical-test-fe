<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Pencil, Trash } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'

import type { IPAddress } from '@/types'
import { Can } from '@casl/vue'
import { useAuthStore } from '@/stores/useAuthStore'
import IPAddressForm from '@/views/IPAddresses/components/IPAddressForm.vue'
import DeleteIPAddress from '@/views/IPAddresses/components/DeleteIPAddress.vue'

const { open } = useGlobalModal()
const authStore = useAuthStore()

const props = defineProps<{
  ipAddress: IPAddress
}>()

const handleEdit = () => {
  open({
    title: 'Edit IP address',
    description: 'Edit an IP address',
    component: IPAddressForm,
    props: { ipAddress: props.ipAddress },
  })
}

const handleDelete = () => {
  open({
    title: `Delete IP Address <strong> ${props.ipAddress.ip} </strong>`,
    description: 'You are about to delete an IP address. it is an irreversible action.',
    component: DeleteIPAddress,
    props: { id: props.ipAddress.id },
  })
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-if="props.ipAddress.user?.id === authStore.user?.id || $ability.can('update', 'IPAddress')"
      variant="ghost"
      @click="handleEdit"
      size="icon"
      class="hover:bg-primary hover:text-white"
    >
      <Pencil class="w-4 h-4" />
    </Button>

    <Can I="delete" a="IPAddress" :this="props.ipAddress">
      <Button
        variant="ghost"
        @click="handleDelete"
        size="icon"
        class="hover:bg-red-400 hover:text-white"
      >
        <Trash class="w-4 h-4" />
      </Button>
    </Can>
  </div>
</template>
