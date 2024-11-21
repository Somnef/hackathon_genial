<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import { ref } from 'vue'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]

const isCardDetailsVisible = ref(false)

// Alert state
const alertVisible = ref(false)
const alertMessage = ref('')

// Handle Buy Button Click
function handleBuyClick() {
  alertMessage.value = 'You have purchased successfully!'
  alertVisible.value = true

  // Auto-dismiss the alert after 3 seconds
  setTimeout(() => {
    alertVisible.value = false
  }, 3000)
}
</script>

<template>
  <VContainer>
    <!-- Success Alert -->
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
      <VCol
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
                <VCardTitle>Energy Units 15000 Kilo Watts</VCardTitle>
              </VCardItem>

              <VCardText>
                Description for the text
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Price :</span> <span class="font-weight-medium">$899</span>
              </VCardText>

              <VCardActions class="justify-space-between">
                <VBtn @click="handleBuyClick">
                  <VIcon icon="bx-cart-add" />
                  <span class="ms-2">Buy</span>
                </VBtn>
              </VCardActions>
            </div>
          </div>
        </VCard>
      </VCol>

      <!-- Additional Cards (unchanged) -->
      <VCol
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
                <VCardTitle>Energy Units 15000 Kilo Watts</VCardTitle>
              </VCardItem>

              <VCardText>
                Description for the text
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Price :</span> <span class="font-weight-medium">$899</span>
              </VCardText>

              <VCardActions class="justify-space-between">
                <VBtn @click="handleBuyClick">
                  <VIcon icon="bx-cart-add" />
                  <span class="ms-2">Buy</span>
                </VBtn>

                <VBtn
                  color="secondary"
                  icon="bx-share-alt"
                />
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
