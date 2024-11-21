<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue';

// Use the router
const router = useRouter();

// Function to fetch the token from the URL
const fetchTokenFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    localStorage.setItem('auth_token', token); // Save the token in localStorage
    // Clean up the URL by navigating to '/dashboard' without the query string
    router.replace({ path: '/dashboard' });
  }
};

// Call the function in the lifecycle hook
onMounted(() => {
  fetchTokenFromURL();
});
</script>

<template>
  <DefaultLayoutWithVerticalNav>
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>