<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const avatars = [avatar1, avatar2, avatar3, avatar4]
const offers = ref([]) // Holds the offers data
const alertVisible = ref(false)
const alertMessage = ref('')

// Fetch offers data from API
async function fetchOffers() {
  try {
    const authToken = localStorage.getItem('auth_token') // Retrieve token

    if (!authToken) {
      alertMessage.value = 'Authentication token not found. Please log in again.'
      alertVisible.value = true

      return
    }

    const response = await axios.get('http://localhost:3000/api/user/offers', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass token in headers
      },
    })

    offers.value = response.data.offers
  } catch (error) {
    console.error('Error fetching offers:', error.response?.data || error.message)
  }
}

// Handle Close Button Click
function handleCloseClick(offerId) {
  alertMessage.value = `Offer with ID ${offerId} has been closed.`
  alertVisible.value = true

  // Remove the offer from the list
  offers.value = offers.value.filter(offer => offer.offerId !== offerId)

  // Auto-dismiss the alert after 3 seconds
  setTimeout(() => {
    alertVisible.value = false
  }, 3000)
}

// Fetch data when component is mounted
onMounted(fetchOffers)
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
      <!-- Dynamically Render Offers -->
      <VCol
        v-for="offer in offers"
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
                <VCardTitle>Offer ID: {{ offer.offerId }}</VCardTitle>
              </VCardItem>
              <VCardText>
                <span>Amount: </span> <span class="font-weight-medium">{{ offer.amount }}</span>
              </VCardText>

              <VCardText>
                <span>Price Per Unit: </span> <span class="font-weight-medium">${{ offer.pricePerUnit }}</span>
              </VCardText>

              <VCardText>
                <span>Expiry: </span>
                <span class="font-weight-medium">
                  {{ new Date(offer.expiry * 1000).toLocaleString() }}
                </span>
              </VCardText>

              <VCardActions class="justify-space-between">
                <VBtn
                  color="red"
                  @click="handleCloseClick(offer.offerId)"
                >
                  <VIcon icon="bx-x-circle" />
                  <span class="ms-2">Close</span>
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
