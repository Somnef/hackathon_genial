<template>
  <div class="auth-container">
    <VaForm ref="form" @submit.prevent="handleSubmit" class="login-form">
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
      <button 
        class="w-full px-6 py-2 bg-blue-800 text-white rounded shadow-md hover:bg-white border-2 border-transparent hover:border-blue-800 hover:text-blue-800 cursor-pointer transition duration-200"
        @click="handleSubmit"
      >
        Login
      </button>
    </VaForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'
import axios from 'axios'

const router = useRouter()
const toast = useToast()

const formData = reactive({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/user/auth/login', {
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 200) {
      const token = response.data.token;

      // Store the token temporarily in the URL
      window.location.href = `http://localhost:8000/dashboard?token=${token}`;
    }
  } catch (error) {
    toast.init({
      message: 'Login failed. Please check your email and password.',
      color: 'danger',
    });
    console.error(error);
  }
};

// Function to fetch user info after login
const fetchUserInfo = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:3000/api/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    // Log the full response object to inspect its structure
    console.log('Full API Response:', response.data);

    // Assuming the response structure is like { walletId: 'wallet123' }
    const walletId = response.data.walletId;
    if (walletId) {
      console.log('Wallet ID:', walletId);
    } else {
      console.log('Wallet ID not found');
    }

  } catch (error) {
    console.error('Error fetching user info:', error);
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