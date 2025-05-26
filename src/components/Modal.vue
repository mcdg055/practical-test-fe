<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGlobalModal } from '@/composables/useGlobalModal'

const {
  isVisible,
  close,
  modalProps,
  onConfirmAction,
  onCancelAction,
  modalTitle,
  modalDescription,
  modalComponent,
} = useGlobalModal()

function onConfirm() {
  onConfirmAction.value()
  close()
}

function handelOnClose() {
  onCancelAction.value()
  close()
}
</script>

<template>
  <Dialog
    :open="isVisible"
    @update:open="
      (openState) => {
        if (!openState) close()
      }
    "
  >
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle v-if="modalTitle" v-html="modalTitle"></DialogTitle>
        <DialogDescription v-if="modalDescription" v-html="modalDescription"></DialogDescription>
      </DialogHeader>
      <component
        v-if="modalComponent"
        :is="modalComponent"
        v-bind="modalProps"
        @close="handelOnClose"
        @done="onConfirm"
      />
    </DialogContent>
  </Dialog>
</template>
