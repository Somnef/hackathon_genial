<script setup>
import axios from 'axios';
import { ref } from 'vue';

const offerIds = Array.from({ length: 20 }, (_, i) => i + 1); // Generate numbers 1 to 20
const selectedOfferId = ref(1); // Default selected offer ID
const bids = ref([]); // Bids data for the selected offer ID

// Fetch bids for the selected offer ID
const fetchBids = async () => {
  try {
    const authToken = localStorage.getItem('auth_token'); // Retrieve token

    if (!authToken) {
      console.error('Authentication token not found. Please log in again.');
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/api/auction/bid/list/${selectedOfferId.value}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Pass token in headers
        },
      }
    );

    if (response.data.success) {
      // Mask bidder details and update bids data
      bids.value = response.data.bids.map(bid => ({
        ...bid,
        bidder: `${bid.bidder.slice(0, 6)}****`, // Mask bidder address
      }));
    }
  } catch (error) {
    console.error('Error fetching bids:', error.response?.data || error.message);
  }
};

// Fetch bids initially
fetchBids();
</script>

<template>
  <div class="dropdown-container">
    <label for="offerIdDropdown">Select Offer ID:</label>
    <select
      id="offerIdDropdown"
      v-model="selectedOfferId"
      @change="fetchBids"
    >
      <option
        v-for="offerId in offerIds"
        :key="offerId"
        :value="offerId"
      >
        {{ offerId }}
      </option>
    </select>
  </div>

  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">Offer ID</th>
        <th>Bidder</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="bid in bids"
        :key="bid.bidder + bid.amount"
      >
        <td>{{ bid.offerId }}</td>
        <td>{{ bid.bidder }}</td>
        <td>{{ bid.amount }}</td>
      </tr>
    </tbody>
  </VTable>
</template>
