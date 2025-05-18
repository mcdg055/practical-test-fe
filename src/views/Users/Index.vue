<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import UsersTable from '@/views/Users/components/UsersTable.vue'
import { fetchUsers } from '@/api/users'
import { onBeforeMount } from 'vue'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
onBeforeMount(() => {
  fetchUsers(usersStore.filter).then((res) => {
    usersStore.setUsers(res.data.data)
  })
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
