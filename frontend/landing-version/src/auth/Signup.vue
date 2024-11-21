<template>
  <div class="auth-container">
    <VaForm ref="form" @submit.prevent="submit" class="signup-form">
      <h1 class="font-semibold text-4xl mb-4 text-center">Sign up</h1>
      <p class="text-base mb-4 leading-5 text-center">
        Have an account?
        <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">Login</RouterLink>
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
          ref="password1"
          v-model="formData.password"
          :type="isPasswordVisible.value ? 'text' : 'password'"
          class="mb-4"
          label="Password"
          messages="Password should be 8+ characters: letters, numbers, and special characters."
          @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
        >
          <template #appendInner>
          </template>
        </VaInput>

        <VaInput
          ref="password2"
          v-model="formData.repeatPassword"
          :type="isPasswordVisible.value ? 'text' : 'password'"
          class="mb-4"
          label="Repeat Password"
          @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
        >
          <template #appendInner>
          </template>
        </VaInput>
      </VaValue>

      <!-- Submit Button -->
      <VaButton :to="{ name: 'main' }" class="w-full mt-4" preset="secondary" @click="submit">Create account</VaButton>
    </VaForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { VaIcon } from 'vuestic-ui';

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = () => {
  if (validate()) {
    init({
      message: "You've successfully signed up",
      color: 'success',
    })
    push({ name: 'dashboard' })
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || 'Password field is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must contain at least one special character',
]
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--va-background-secondary); /* Ensure background matches Login */
}

.signup-form {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  max-width: 400px;
  width: 100%;
  padding: 20px;
}
</style>