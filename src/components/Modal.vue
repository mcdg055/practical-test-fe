<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  modalTescription,
  modalComponent,
} = useGlobalModal()

function onConfirm() {
  onConfirmAction.value()
  close()
}

function handelOnClose() {
  onConfirmAction.value()
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
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle v-if="modalTitle">{{ modalTitle }}</DialogTitle>
        <DialogDescription v-if="modalTescription">
          {{ modalTescription }}
        </DialogDescription>
      </DialogHeader>
      <component :is="modalComponent" v-bind="modalProps" @close="handelOnClose" />
    </DialogContent>
  </Dialog>
</template>
