<script setup>
import Footer from '@/layouts/components/Footer.vue';
import NavItems from '@/layouts/components/NavItems.vue';
import logo from '@images/logo.svg?raw';
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const user = ref({
  name: '',
  walletId: '',
  createdAt: '',
});

const logout = () => {
  // Clear user session and redirect to logout URL
  localStorage.removeItem('auth_token'); // Remove authentication token
  window.location.href = 'http://localhost:4000/'; // Redirect to the specified URL
};

const fetchUserData = async () => {
  try {
    const authToken = localStorage.getItem('auth_token'); // Retrieve token

    if (!authToken) {
      console.error('No auth token found. Redirecting to login...');
      logout(); // Redirect to login if no token
      return;
    }

    const response = await axios.get('http://localhost:3000/api/user/me', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass token in headers
      },
    });

    const { name, walletId, createdAt } = response.data;
    user.value = {
      name,
      walletId: `${walletId.slice(0, 8)}****`, // Mask wallet ID
      createdAt: new Date(createdAt).toLocaleDateString(), // Format date
    };
  } catch (error) {
    console.error('Error fetching user data:', error.response?.data || error.message);
    logout(); // Redirect to login on error
  }
};

// Fetch user data when the component is mounted
onMounted(fetchUserData);
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <VSpacer />

        <!-- User Information in a Single Line -->
        <div class="d-flex align-center me-3">
          <span>{{ user.name }}</span>
          <span class="mx-2">|</span>
          <span>Wallet ID: {{ user.walletId }}</span>
          <span class="mx-2">|</span>
          <span>Joined: {{ user.createdAt }}</span>
        </div>

        <!-- Logout Button -->
        <button
          class="btn btn-danger"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="d-flex"
          v-html="logo"
        />
        <!-- eslint-enable -->

        <h1 class="app-logo-title">
          e-skimos
        </h1>
      </RouterLink>

      <IconBtn
        class="d-block d-lg-none"
        @click="toggleIsOverlayNavActive(false)"
      >
        <VIcon icon="bx-x" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>


<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
}
</style>
