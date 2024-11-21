<script setup>
import axios from 'axios';
import { ref } from 'vue';

// Reactive form fields
const amount = ref('');
const expiry = ref('');
const startingPrice = ref('');

// Reactive alert messages
const alert = ref({
  type: '', // 'success' or 'danger'
  message: '',
});

// Handle form submission
const handleSubmit = async () => {
  try {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
      alert.value = {
        type: 'danger',
        message: 'Authentication token not found. Please log in again.',
      };
      return;
    }

    // Convert the expiry date to milliseconds
    const expiryInMilliseconds = new Date(expiry.value).getTime();

    if (isNaN(expiryInMilliseconds)) {
      alert.value = {
        type: 'danger',
        message: 'Invalid expiry date. Please enter a valid date and time.',
      };
      return;
    }

    // Make a POST request to the backend with the token and data
    const response = await axios.post(
      'http://localhost:3000/api/offer/create',
      {
        amount: amount.value,
        expiry: expiryInMilliseconds,
        startingPrice: startingPrice.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Pass the token in the Authorization header
        },
      }
    );

    // Handle success response
    alert.value = {
      type: 'success',
      message: 'Offer created successfully!',
    };

    // Clear form fields
    amount.value = '';
    expiry.value = '';
    startingPrice.value = '';
  } catch (error) {
    // Handle errors
    alert.value = {
      type: 'danger',
      message: error.response?.data?.message || 'Failed to create offer. Please try again.',
    };
  }
};
</script>
<template>
  <div>
    <!-- Dynamic Alert -->
    <div
      v-if="alert.message"
      class="alert"
      :class="`alert-${alert.type}`"
      role="alert"
    >
      {{ alert.message }}
    </div>

    <VForm @submit.prevent="handleSubmit">
      <VRow>
        <!-- Amount Input -->
        <VCol cols="12">
          <VTextField
            v-model="amount"
            prepend-inner-icon="bx-cube"
            label="Amount"
            placeholder="Enter the amount"
            type="number"
            required
          />
        </VCol>

        <!-- Expiry Date and Time Input -->
        <VCol cols="12">
          <VTextField
            v-model="expiry"
            prepend-inner-icon="bx-calendar"
            label="Expiry Date and Time"
            type="datetime-local"
            required
          />
        </VCol>

        <!-- Starting Price Input -->
        <VCol cols="12">
          <VTextField
            v-model="startingPrice"
            prepend-inner-icon="bx-money"
            label="Starting Price"
            placeholder="Enter the starting price"
            type="number"
            required
          />
        </VCol>

        <!-- Submit and Reset Buttons -->
        <VCol cols="12" class="mt-4">
          <VBtn
            type="submit"
            class="me-2"
            color="primary"
          >
            Submit
          </VBtn>

          <VBtn
            color="secondary"
            type="reset"
            variant="tonal"
            @click="() => {
              amount.value = '';
              expiry.value = '';
              startingPrice.value = '';
            }"
          >
            Reset
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>


<style scoped>
.alert {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
