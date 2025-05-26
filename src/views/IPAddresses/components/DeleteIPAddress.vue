<script setup lang="ts">
import { toast } from 'vue-sonner'
import Button2 from '@/components/ui/button/Button2.vue'
import { useIPAddressStore } from '@/stores/useIPAddressStore'
import { deleteIPAddressService } from '@/services/IPAddressService'

const props = defineProps<{
  id: number
}>()

const ipAddressStore = useIPAddressStore()
const emit = defineEmits(['done', 'close'])

const handleDelete = () => {
  deleteIPAddressService(props.id).then(() => {
    toast.success('IP Address deleted successfully')
    emit('done')
  })
}
</script>

<template>
  <div class="flex justify-end gap-2 mt-2">
    <Button2 @click="emit('close')" variant="secondary">Cancel</Button2>
    <Button2 @click="handleDelete" :loading="ipAddressStore.loading.delete" variant="destructive">
      Yes, delete it!
    </Button2>
  </div>
</template>
