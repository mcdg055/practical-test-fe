<script setup lang="ts">
import { deleteUserService } from '@/services/userService'
import { toast } from 'vue-sonner'
import { useUsersStore } from '@/stores/users'
import Button2 from '@/components/ui/button/Button2.vue'

const props = defineProps<{
  id: number
}>()

const userStore = useUsersStore()
const emit = defineEmits(['done', 'close'])

const handleDelete = () => {
  deleteUserService(props.id).then(() => {
    toast.success('User deleted successfully')
    emit('done')
  })
}
</script>

<template>
  <div class="flex justify-end gap-2 mt-2">
    <Button2 @click="emit('close')" variant="secondary">Cancel</Button2>
    <Button2 @click="handleDelete" :loading="userStore.loading.delete" variant="destructive">
      Yes, delete it!
    </Button2>
  </div>
</template>
