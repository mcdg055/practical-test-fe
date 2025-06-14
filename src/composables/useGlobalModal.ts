// composables/useGlobalModal.ts
import { ref, markRaw, type Ref, nextTick, type Component } from 'vue'

interface ModalOptions {
  component: Component
  props?: Record<string, any>
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
  description?: string
}

const isVisible: Ref<boolean> = ref(false)
const modalComponent: Ref<Component | null> = ref(null)
const modalProps: Ref<Record<string, any> | null> = ref(null)
const onConfirmAction: Ref<() => void> = ref(() => {})
const onCancelAction: Ref<() => void> = ref(() => {})
const modalTitle: Ref<string> = ref('')
const modalDescription: Ref<string> = ref('')

export function useGlobalModal() {
  async function open({ component, props, onConfirm, onCancel, title, description }: ModalOptions) {
    modalComponent.value = markRaw(component)
    modalProps.value = props || {}
    onConfirmAction.value = onConfirm || (() => {})
    onCancelAction.value = onCancel || (() => {})
    modalTitle.value = title ?? ''
    modalDescription.value = description ?? ''

    await nextTick()
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  return {
    isVisible,
    modalComponent,
    modalProps,
    onConfirmAction,
    onCancelAction,
    modalTitle,
    modalDescription,
    open,
    close,
  }
}
