<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Sample avatars
const avatars = [avatar1, avatar2, avatar3, avatar4]

// State for fetched offers
const offers = ref([])
const bidAmounts = ref([]) // To track slider values for each offer

// Alert state
const alertVisible = ref(false)
const alertMessage = ref('')

// Fetch offers on component mount
onMounted(async () => {
  try {
    const token = localStorage.getItem('auth_token') // Retrieve token from localStorage

    if (!token) {
      throw new Error('Authentication token not found.')
    }

    const response = await axios.get('http://localhost:3000/api/offer/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Assign fetched offers to state and initialize bid amounts
    offers.value = response.data.offers
    bidAmounts.value = offers.value.map(() => 1) // Default bid to 1 unit for each offer
    console.log("Offers:", offers.value)
  } catch (error) {
    console.error('Failed to fetch offers:', error)
    alertMessage.value = 'Error fetching offers. Please try again later.'
    alertVisible.value = true
  }
})

// Format Seller ID
function formatSeller(seller) {
  if (seller.length > 10) {
    return seller.slice(0, 10) + '*****'
  }
  return seller
}

// Handle Buy Button Click
function handleBuyClick(index) {
  const offer = offers.value[index]
  const bidAmount = bidAmounts.value[index]
  alertMessage.value = `You have purchased ${bidAmount} units from seller ${formatSeller(offer.seller)} for $${offer.pricePerUnit}/unit`
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
        v-for="(offer, index) in offers"
        :key="offer.offerId"
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
                <VCardTitle>Offer {{ offer.offerId }}</VCardTitle>
              </VCardItem>

              <VCardText>
                Seller: {{ formatSeller(offer.seller) }}
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Amount :</span>
                <span class="font-weight-medium">{{ offer.amount }} units</span>
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Price per Unit :</span>
                <span class="font-weight-medium">${{ offer.pricePerUnit }}</span>
              </VCardText>

              <VCardText class="text-subtitle-1">
                <span>Expiry :</span>
                <span class="font-weight-medium">{{ new Date(offer.expiry * 1000).toLocaleString() }}</span>
              </VCardText>

              <!-- Slider for selecting bid amount -->
              <VCardText class="text-subtitle-1">
                <span>Bid Amount:</span>
                <VSlider
                  v-model="bidAmounts[index]"
                  :max="offer.amount"
                  min="1"
                  step="1"
                  class="mt-2"
                />
                <span>{{ bidAmounts[index] }} units</span>
              </VCardText>

              <VCardActions class="justify-space-between">
                <!-- Buy Button -->
                <VBtn @click="handleBuyClick(index)">
                  <VIcon icon="bx-cart-add" />
                  <span class="ms-2">Bid</span>
                </VBtn>
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