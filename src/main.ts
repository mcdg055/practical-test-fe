import { useAuthStore } from './stores/auth'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { abilitiesPlugin, Can } from '@casl/vue'
import { ability } from './casl/ability'
import { defineAbilitiesFromRolesAndPermissions } from './casl/defineAbilities'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

app.component('Can', Can)

const usersStore = useAuthStore()

const { roles, permissions } = storeToRefs(usersStore)

watch(
  [roles, permissions],
  ([newRoles, newPermissions]) => {
    const newAbility = defineAbilitiesFromRolesAndPermissions(newRoles, newPermissions)
    ability.update(newAbility.rules)
  },
  { immediate: true },
)

app.mount('#app')
