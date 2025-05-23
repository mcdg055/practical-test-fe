<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { defineEmits, onMounted, ref } from 'vue'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeClosed, Loader2 } from 'lucide-vue-next'
import { useUsersStore } from '@/stores/users'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { User } from '@/types'
import { saveUserService, updateUserService } from '@/services/userService'

const showPassword = ref(false)
const emit = defineEmits(['close'])
const userStore = useUsersStore()

const props = defineProps<{
  user?: User
}>()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z
      .string()
      .email('This is not a valid email')
      .min(1, { message: 'Email is required' })
      .max(50),
    password: props.user
      ? z.string().min(0).max(32).optional()
      : z
          .string()
          .min(1, { message: 'Password is required' })
          .min(8, { message: 'Password must be at least 8 characters' })
          .max(32), // add: required
    roles: z.array(z.string()).min(1, { message: 'At least one role is required' }),
  }),
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.user?.name ?? '',
    email: props.user?.email ?? '',
    password: '', // always blank for edit
    roles: props.user?.roles ?? [],
  },
})

const onSubmit = handleSubmit((values) => {
  const action = props.user ? updateUserService(props.user.id, values) : saveUserService(values)

  action
    .then(() => {
      toast.success(props.user?.id ? 'User updated successfully' : 'User created successfully')
      emit('close')
    })
    .catch((error: any) => {
      console.error(error)
      toast.error(error.response.data.message)
    })
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
      <FormItem class="mb-3">
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter full name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem class="mb-3">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter Email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="roles">
      <FormItem>
        <FormLabel>Role</FormLabel>

        <Select v-bind="componentField" multiple>
          <FormControl>
            <SelectTrigger class="w-full mb-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="role in userStore.getRoles" :value="role">
                {{ role }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem class="mb-3">
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter Password"
              v-bind="componentField"
            />
            <Button
              class="absolute top-[50%] right-0 translate-y-[-50%]"
              type="button"
              size="icon"
              variant="ghost"
              @click="showPassword = !showPassword"
            >
              <Eye v-if="showPassword" class="w-4 h-4" />
              <EyeClosed v-else class="w-4 h-4" />
            </Button>
          </div>
        </FormControl>
        <FormDescription class="text-xs text-muted-foreground">
          Leave empty if you don't want to change the password
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-end">
      <Button :disabled="userStore.loading.form" type="submit">
        <div v-if="userStore.loading.form" class="flex items-center justify-center">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />Saving
        </div>
        <span v-else> Save changes </span>
      </Button>
    </div>
  </form>
</template>
