<template>
  <div class="auth-container">
    <VaForm ref="passwordForm" @submit.prevent="submit" class="recover-form">
      <h1 class="font-semibold text-4xl mb-4 text-center">Forgot your password?</h1>
      <p class="text-base mb-6 text-center leading-5">
        If you've forgotten your password, don't worry. Simply enter your email address below, and we'll send you an email
        with a temporary password. Restoring access to your account has never been easier.
      </p>

      <!-- Email Input -->
      <VaInput
        v-model="email"
        class="mb-4"
        label="Enter your email"
        type="email"
      />

      <!-- Submit Button -->
      <VaButton class="w-full mb-2" @click="submit">Send password</VaButton>

      <!-- Go back button -->
      <VaButton :to="{ name: 'login' }" class="w-full" preset="secondary">Go back</VaButton>
    </VaForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const email = ref('')
const form = useForm('passwordForm')
const router = useRouter()

const submit = () => {
  if (form.validate()) {
    router.push({ name: 'recover-password-email' })
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--va-background-secondary); /* Ensure the background is consistent */
}

.recover-form {
  display: flex;
  flex-direction: column; /* Stack the items vertically */
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* Ensures proper box sizing */
}
</style>