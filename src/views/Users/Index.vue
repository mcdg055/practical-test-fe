<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import UsersTable from '@/views/Users/components/UsersTable.vue'
import { fetchUsers, fetchRoles } from '@/api/users'
import { onBeforeMount } from 'vue'
import { useUsersStore } from '@/stores/users'
import { fetchRolesService, fetchUsersService } from '@/services/userService'

const usersStore = useUsersStore()

onBeforeMount(() => {
  if (!usersStore.roles.length) {
    fetchRolesService()
  }

  if (!usersStore.users.length) {
    fetchUsersService(usersStore.pagination)
  }
})
</script>

<template>
  <AppLayout>
    <div class="bg-white drop-shadow-lg rounded-2xl p-5 mt-5">
      <div>
        <h1 class="font-bold text-lg">Users table</h1>
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  </AppLayout>
</template>
