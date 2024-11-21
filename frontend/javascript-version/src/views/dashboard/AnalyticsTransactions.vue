<script setup>
import statsVerticalChart from '@images/cards/chart-success.png'
import statsVerticalPaypal from '@images/cards/paypal-error.png'
import statsVerticalWallet from '@images/cards/wallet-primary.png'
import { ref } from 'vue'

const transactions = [
  {
    amount: +500.25,
    paymentMethod: 'Solar Energy',
    description: 'Sell',
    icon: statsVerticalWallet,
    color: 'primary',
  },
  {
    paymentMethod: 'Wind Energy',
    amount: +312.50,
    description: 'Sell',
    icon: statsVerticalPaypal,
    color: 'error',
  },
  {
    amount: +765.80,
    paymentMethod: 'Geothermal Energy',
    description: 'Sell',
    icon: statsVerticalChart,
    color: 'info',
  },
  {
    paymentMethod: 'Hydropower',
    amount: +420.90,
    description: 'Sell',
    icon: statsVerticalChart,
    color: 'success',
  },
  {
    paymentMethod: 'Solar Energy',
    amount: -200.50,
    description: 'Buy',
    icon: statsVerticalWallet,
    color: 'primary',
  },
  {
    paymentMethod: 'Wind Energy',
    amount: -180.30,
    description: 'Buy',
    icon: statsVerticalPaypal,
    color: 'error',
  },
]

const moreList = [
  {
    title: 'Share',
    value: 'Share',
  },
  {
    title: 'Refresh',
    value: 'Refresh',
  },
  {
    title: 'Update',
    value: 'Update',
  },
]
</script>

<template>
  <VCard title="Latest Transactions">
    <template #append>
      <MoreBtn :menu-list="moreList" />
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="item in transactions"
          :key="item.paymentMethod"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="item.color"
              :image="item.icon"
              size="40"
            />
          </template>

          <VListItemSubtitle>
            {{ item.paymentMethod }}
          </VListItemSubtitle>
          <VListItemTitle>
            {{ item.description }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-2">{{ item.amount > 0 ? `+$${Math.abs(item.amount)}` : `-$${Math.abs(item.amount)}` }}</span>
              <span class="text-disabled">USD</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.5rem;
  }
</style>