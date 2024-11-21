<template>
  <div class="auth-container">
    <VaForm ref="form" @submit.prevent="submit" class="login-form">
      <h1 class="font-semibold text-4xl mb-4">Log in</h1>
      <p class="text-base mb-4 leading-5">
        New to E-Skimo?
        <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</RouterLink>
      </p>

      <!-- Email Input -->
      <VaInput
        v-model="formData.email"
        class="mb-4"
        label="Email"
        type="email"
      />

      <!-- Password Input -->
      <VaValue v-slot="isPasswordVisible" :default-value="false">
        <VaInput
          v-model="formData.password"
          :type="isPasswordVisible.value ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
        >
          <template #appendInner>
          </template>
        </VaInput>
      </VaValue>

      <!-- Options: Keep me signed in + Forgot password -->
      <div class="auth-options flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <RouterLink
          :to="{ name: 'recover-password' }"
          class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary"
        >
          Forgot password?
        </RouterLink>
      </div>

      <!-- Submit Button -->
      <VaButton :to="{ name: 'main' }" class="w-full" style="z-index: 1;" preset="secondary" @click="submit">
        Login
      </VaButton>
    </VaForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../services/utils'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = () => {
  if (validate()) {
    init({ message: "You've successfully logged in", color: 'success' })
    push({ name: 'dashboard' })
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
}

.login-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* Ensure proper box-sizing */
}

.auth-options {
  width: 100%; /* Ensure full width for options */
}
</style>