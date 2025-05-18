<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  console.log(onConfirmAction.value)

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
      <component :is="modalComponent" v-bind="modalProps" />
      <DialogFooter>
        <Button @click="onConfirm" type="button"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
