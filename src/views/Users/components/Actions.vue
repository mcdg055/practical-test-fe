<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Pencil, Trash } from 'lucide-vue-next'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const handleEdit = () => {
  console.log('edit', props.id)
}

const handleDelete = () => {
  console.log('delete', props.id)
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
