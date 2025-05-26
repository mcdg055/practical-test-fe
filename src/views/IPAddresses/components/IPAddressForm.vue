<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { defineEmits, watch } from 'vue'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { IPAddress } from '@/types'
import { saveIpAddressService, updateIpAddressService } from '@/services/IPAddressService'
import Button2 from '@/components/ui/button/Button2.vue'
import { useIPAddressStore } from '@/stores/useIPAddressStore'

const emit = defineEmits(['close'])
const ipAddressStore = useIPAddressStore()

const props = defineProps<{
  ipAddress?: IPAddress
}>()

function getIpType(ip: string): 'IPv4' | 'IPv6' | '' {
  if (ip.includes('.')) {
    const parts = ip.split('.')
    if (
      parts.length === 4 &&
      parts.every((part) => /^\d+$/.test(part) && +part >= 0 && +part <= 255)
    ) {
      return 'IPv4'
    }
  } else if (ip.includes(':')) {
    const parts = ip.split(':')
    if (
      parts.length >= 3 &&
      parts.length <= 8 &&
      parts.every((part) => part === '' || /^[0-9a-fA-F]{1,4}$/.test(part))
    ) {
      return 'IPv6'
    }
  }
  return ''
}

const formSchema = toTypedSchema(
  z.object({
    ip: z.string().refine((ip) => getIpType(ip) !== '', {
      message: 'Invalid IPv4 or IPv6 address',
    }),
    label: z.string().min(1, { message: 'Label is required' }).max(50),
    type: z.string(), // Will be auto-detected
    comment: z.string().optional(),
  }),
)

const { isFieldDirty, handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    ip: props.ipAddress?.ip ?? '',
    type: props.ipAddress?.type ?? '',
    label: props.ipAddress?.label ?? '',
    comment: props.ipAddress?.comment ?? '',
  },
})

watch(
  () => values.ip,
  (newIp) => {
    setFieldValue('type', getIpType(newIp))
  },
)

const onSubmit = handleSubmit((values) => {
  const action = props.ipAddress
    ? updateIpAddressService(props.ipAddress.id as number, values)
    : saveIpAddressService(values)

  action
    .then(() => {
      toast.success(
        props.ipAddress?.id ? 'IP Address updated successfully' : 'IP Address created successfully',
      )
      emit('close')
    })
    .catch((error: any) => {
      console.error(error)
      toast.error(error.response?.data?.message || 'An error occurred')
    })
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="ip" :validate-on-blur="!isFieldDirty">
      <FormItem class="mb-3">
        <FormLabel>IP Address (IPv4 or IPv6) </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter IP Address (IPv4 or IPv6)"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="type" :validate-on-blur="!isFieldDirty">
      <FormItem class="mb-3">
        <FormLabel>Type</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Type" v-bind="componentField" readonly />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="label" :validate-on-blur="!isFieldDirty" readonly>
      <FormItem class="mb-3">
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Label" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="comment"
      :validate-on-blur="!isFieldDirty"
      readonly
    >
      <FormItem class="mb-3">
        <FormLabel>Comment (optional)</FormLabel>
        <FormControl>
          <Textarea placeholder="Type your comment here (Optional)." v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-end">
      <Button2 type="submit" :loading="ipAddressStore.loading.save">Save</Button2>
    </div>
  </form>
</template>
