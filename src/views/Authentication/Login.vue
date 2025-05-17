<script script setup lang="ts">
import vault from '@/assets/vault.svg'
import Logo from '@/components/Logo.vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import facebook from '@/assets/facebook.svg'
import google from '@/assets/google.svg'
import github from '@/assets/github.svg'
import { login } from '@/api/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Loader2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const submitLogin = () => {
  isLoading.value = true
  login({
    email: email.value,
    password: password.value,
  })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.authorization.token)
        authStore.setUser(res.data.user)
        router.push({ name: 'dashboard' })
      } else {
        alert('Login failed')
      }
    })
    .catch((error) => {
      console.error('Login error:', error)
      alert('An error occurred during login')
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <div class="w-[35%] p-5 items-center justify-center hidden md:flex">
      <img :src="vault" class="max-w-[500px] w-full" />
    </div>
    <div
      class="w-full md:w-[65%] flex flex-col items-center justify-center bg-primary h-full text-center"
    >
      <div class="w-full bg-white rounded-lg shadow-lg p-8 max-w-[420px]">
        <Logo />
        <div>
          <div class="text-2xl font-bold">Welcome to IPVault</div>
          <div class="text-sm text-gray-500">
            Securely manage and track every IP—anytime, anywhere.
          </div>
          <form class="block mt-5">
            <div class="mb-3">
              <Input v-model="email" class="p-6" type="email" placeholder="Email" />
            </div>
            <div class="mb-3">
              <Input v-model="password" class="p-6" type="password" placeholder="Password" />
            </div>
            <div>
              <Button :disabled="isLoading" type="button" @click="submitLogin" class="w-full p-6">
                <div v-if="isLoading" class="flex items-center justify-center">
                  <Loader2 class="w-4 h-4 mr-2 animate-spin" /> Logging in...
                </div>
                <span v-else>Login</span>
              </Button>
            </div>
          </form>

          <div class="social-icons flex items-center mt-5 justify-center gap-3">
            <div>or login with</div>
            <div class="flex justify-center items-center gap-2">
              <a href="#" class="text-blue-500 hover:text-blue-700">
                <img class="w-[30px]" :src="google" alt="google" />
              </a>
              <a href="#" class="text-blue-500 hover:text-blue-700">
                <img class="w-[40px]" :src="github" alt="github" />
              </a>
              <a href="#" class="text-blue-500 hover:text-blue-700">
                <img class="w-[40px]" :src="facebook" alt="facebook" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
