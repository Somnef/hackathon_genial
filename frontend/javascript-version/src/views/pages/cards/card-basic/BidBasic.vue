<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import { ref } from 'vue'

// Sample avatars
const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]

// Slider values for each card
const sliderValues = ref([899, 899, 899, 899, 899, 899]) // Initial value set to price

const isCardDetailsVisible = ref(false)

// Price constant for validation
const price = 899

// Alert state
const alertVisible = ref(false)
const alertMessage = ref('')

// Handle Buy Button Click
function handleBuyClick(index) {
  alertMessage.value = `You have purchased ${sliderValues.value[index]} units for card ${index + 1}`
  alertVisible.value = true
}
</script>

<template>
  <VContainer>
    <!-- Global Success Alert -->
    <VAlert
      v-if="alertVisible"
      type="success"
      class="mb-4"
      dismissible
      @click:close="alertVisible = false"
    >
      {{ alertMessage }}
    </VAlert>

    <VRow>
      <!-- Cards -->
      <VCol
        v-for="(value, index) in sliderValues"
        :key="index"
        sm="6"
        cols="12"
      >
        <VCard>
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="ma-auto pa-5">
              <VImg
                width="137"
                height="176"
                :src="eCommerce2"
              />
            </div>

            <VDivider :vertical="$vuetify.display.mdAndUp" />

            <div>
              <VCardItem>
                <VCardTitle>Energy Units {{ index + 1 }}000 Kilo Watts</VCardTitle>
              </VCardItem>

              <VCardText>
                Description for the text
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Price :</span> <span class="font-weight-medium">${{ price }}</span>
              </VCardText>

              <VCardActions>
                <!-- Slider with Validation -->
                <VSlider
                  v-model="sliderValues[index]"
                  class="ma-3"
                  :min="price"
                  max="10000"
                  label="Quantity"
                  @update:model-value="value => { if (value < price) sliderValues[index] = price }"
                />
              </VCardActions>

              <VCardActions class="justify-space-between">
                <!-- Buy Button on Next Line -->
                <VBtn @click="handleBuyClick(index)">
                  <VIcon icon="bx-cart-add" />
                  <span class="ms-2">Buy</span>
                </VBtn>
              </VCardActions>

              <VCardActions class="justify-space-between">
            
              </VCardActions>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}
</style>
