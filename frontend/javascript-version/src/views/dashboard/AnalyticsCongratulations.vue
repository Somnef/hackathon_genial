<script setup>
import illustrationJohnDark from '@images/cards/illustration-john-dark.png';
import illustrationJohnLight from '@images/cards/illustration-john-light.png';
import { useTheme } from 'vuetify';

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)

// Example renewable energy data for the user
const totalEnergyContribution = 1250; // This could be dynamic based on user data (in kWh)

// Calculate the compliment based on the total contribution
const compliment = computed(() => {
  if (totalEnergyContribution >= 1000) {
    return "Amazing work! Your contributions are helping shape a sustainable future!";
  } else if (totalEnergyContribution >= 500) {
    return "Great job! You're making a positive impact on the planet.";
  } else {
    return "Keep going! Every bit counts towards a better future.";
  }
});
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem class="pb-3">
          <VCardTitle class="text-primary">
            Your Renewable Energy Contribution
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span class="font-weight-bold">{{ totalEnergyContribution }} kWh</span> of renewable energy have been contributed to the platform so far.
          {{ compliment }}
          <br>
          <VBtn
            variant="tonal"
            class="mt-6"
            size="small"
          >
            Go to Offers
          </VBtn>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '182'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.125rem;
  inset-inline-end: 3.5rem;
}
</style>