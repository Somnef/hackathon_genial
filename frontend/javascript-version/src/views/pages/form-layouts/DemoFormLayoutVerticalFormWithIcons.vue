<script setup>
import { ref } from 'vue';

const amount = ref('');
const pricePerUnit = ref('');
const expiry = ref('');
</script>

<template>
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

      <!-- Price Per Unit Input -->
      <VCol cols="12">
        <VTextField
          v-model="pricePerUnit"
          prepend-inner-icon="bx-dollar-circle"
          label="Price Per Unit"
          placeholder="Enter price per unit"
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
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<script>
const handleSubmit = () => {
  console.log('Amount:', amount.value);
  console.log('Price Per Unit:', pricePerUnit.value);
  console.log('Expiry:', expiry.value);
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
