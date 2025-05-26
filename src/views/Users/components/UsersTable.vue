<script setup lang="ts" generic="TData, TValue">
import { columns as tableColumns } from './columns'
import { useUsersStore } from '@/stores/users'
import { Plus } from 'lucide-vue-next'
import { useGlobalModal } from '@/composables/useGlobalModal'
import { storeToRefs } from 'pinia'

import { fetchUsersService } from '@/services/userService'
import UserForm from './UserForm.vue'
import DataTable from '@/components/reusable/DataTable.vue'
import Button2 from '@/components/ui/button/Button2.vue'

const { open } = useGlobalModal()

const usersStore = useUsersStore()

const { users } = storeToRefs(usersStore)

function handleAddUser() {
  open({
    title: 'Add user',
    description: 'Add a new user',
    component: UserForm,
  })
}
</script>

<template>
  <DataTable
    :data="users"
    :table-columns="tableColumns"
    :loading="usersStore.loading.users"
    :pagination="usersStore.pagination"
    :handle-fetch-data="fetchUsersService"
  >
    <template #actions>
      <Button2 class="min-w-[100px]" @click="handleAddUser" :loading="usersStore.loading.roles">
        <Plus class="w-4 h-4" />
        Add</Button2
      >
    </template>
  </DataTable>
</template>
