<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { LogOut } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'vue-router'
import { logoutService } from '@/services/authService'

const router = useRouter()

const handleLogout = () => {
  logoutService().then(() => {
    router.push({ name: 'login' })
  })
}
</script>

<template>
  <div class="px-5 mt-auto mb-5">
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button class="w-full flex justify-start gap-4 bg-red-500 hover:bg-red-600 font-semibold">
          <LogOut stroke-width="3" class="w-[14px] h-[14px]" />
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are sure you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction as-child>
            <Button @click="handleLogout" class="bg-red-500 hover:bg-red-600"> Continue </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
