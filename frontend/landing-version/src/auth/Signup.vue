<template>
  <div class="auth-container">
    <VaForm ref="form" @submit.prevent="submit" class="signup-form">
      <h1 class="font-semibold text-4xl mb-4 text-center">Sign up</h1>
      <p class="text-base mb-4 leading-5 text-center">
        Have an account?
        <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">Login</RouterLink>
      </p>

      <!-- Name Input -->
      <VaInput
        v-model="formData.name"
        class="mb-4"
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        required
      />

      <!-- Email Input -->
      <VaInput
        v-model="formData.email"
        class="mb-4"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
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
          placeholder="Enter your password"
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
          placeholder="Repeat your password"
          @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
        >
          <template #appendInner>
          </template>
        </VaInput>
      </VaValue>

      <!-- Submit Button -->
      <button class="w-full mt-4" preset="secondary" @click="submit">Create account</button>
    </VaForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter(); // Vue Router instance

const formData = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
});

const submit = async () => {
  // Validate that passwords match
  if (formData.password !== formData.repeatPassword) {
    return; // Exit early if passwords do not match
  }

  try {
    // Make a POST request to the backend
    const response = await axios.post('http://localhost:3000/api/user/auth/sign-up', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 201) { // Assuming backend returns 201 for success
      // Redirect to the sign-in page
      router.push({ name: 'login' }); // Adjust this route name as per your Vue Router configuration
    }
  } catch (error) {
    // Log errors to console for debugging
    console.error('Sign-up error:', error.response?.data?.message || error.message);
  }
};
</script>



<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--va-background-secondary);
}

.signup-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-input {
  margin-bottom: 16px;
}

.VaButton {
  width: 100%;
}
</style>