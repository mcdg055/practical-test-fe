<script setup lang="ts">
import vault from '@/assets/vault.svg'
import Logo from '@/components/Logo.vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import facebook from '@/assets/facebook.svg'
import google from '@/assets/google.svg'
import github from '@/assets/github.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Loader2 } from 'lucide-vue-next'
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { storeToRefs } from 'pinia'
import { loginService } from '@/services/authService'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const { loading, isInvalid } = storeToRefs(authStore)

const submitLogin = () => {
  loginService(email.value, password.value).then(() => {
    router.push({ name: 'dashboard' })
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
          <Alert v-if="isInvalid" variant="destructive" class="text-left mt-3">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Invalid email or password.</AlertTitle>
          </Alert>
          <form @submit.prevent="submitLogin" class="block mt-5">
            <div class="mb-3">
              <Input
                v-model="email"
                class="p-6"
                type="email"
                name="email"
                placeholder="Email"
                autocomplete="email"
              />
            </div>
            <div class="mb-3">
              <Input v-model="password" class="p-6" type="password" placeholder="Password" />
            </div>
            <div>
              <Button :disabled="loading" type="submit" class="w-full p-6">
                <div v-if="loading" class="flex items-center justify-center">
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
                <img class="w-[30px] me-1" :src="google" alt="google" />
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
