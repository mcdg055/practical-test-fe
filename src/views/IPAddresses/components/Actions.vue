<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Pencil, Trash } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'

import type { IPAddress } from '@/types'
import { Can } from '@casl/vue'

const { open } = useGlobalModal()

const props = defineProps<{
  ipAddress: IPAddress
}>()

const handleEdit = () => {}

const handleDelete = () => {}
</script>

<template>
  <div class="flex gap-2">
    <Can I="update" a="IPAddress" :this="props.ipAddress">
      <Button
        variant="ghost"
        @click="handleEdit"
        size="icon"
        class="hover:bg-primary hover:text-white"
      >
        <Pencil class="w-4 h-4" />
      </Button>
    </Can>
    <Can I="delete" a="IPAddress">
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
