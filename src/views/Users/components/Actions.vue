<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Pencil, Trash } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'
import UserForm from './UserForm.vue'
import DeleteUser from './DeleteUser.vue'
import type { User } from '@/types'

const { open } = useGlobalModal()

const props = defineProps<{
  user: User
}>()

const handleEdit = () => {
  open({
    title: 'Edit user',
    description: 'Edit a user',
    component: UserForm,
    props: { user: props.user },
  })
}

const handleDelete = () => {
  open({
    title: `Delete user <strong> ${props.user.name} </strong>`,
    description: 'You are about to delete a user. it is an irreversible action.',
    component: DeleteUser,
    props: { id: props.user.id },
  })
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      variant="ghost"
      @click="handleEdit"
      size="icon"
      class="hover:bg-primary hover:text-white"
    >
      <Pencil class="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      @click="handleDelete"
      size="icon"
      class="hover:bg-red-400 hover:text-white"
    >
      <Trash class="w-4 h-4" />
    </Button>
  </div>
</template>
