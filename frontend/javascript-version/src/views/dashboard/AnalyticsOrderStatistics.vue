<script setup>
import { useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const vuetifyTheme = useTheme()

const series = [
  45,
  80,
  20,
  40,
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const secondaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['medium-emphasis-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
  
  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: {
      width: 6,
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: [
      'Fashion',
      'Electronic',
      'Sports',
      'Decor',
    ],
    colors: [
      currentTheme.success,
      currentTheme.primary,
      currentTheme.secondary,
      currentTheme.info,
    ],
    grid: {
      padding: {
        top: -7,
        bottom: 5,
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: 17,
              fontSize: '13px',
              color: secondaryTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '18px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
              fontWeight: 500,
            },
            total: {
              show: true,
              label: 'Weekly',
              fontSize: '13px',
              lineHeight: '18px',
              formatter: () => '38%',
              color: secondaryTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  }
})

const orders = [
  {
    amount: 2500, // 2500 kWh for Electronic category (more energy-consuming)
    title: 'Solar Panels & Batteries',
    avatarColor: 'primary',
    subtitle: 'Solar Panels, Home Batteries, Inverters',
    avatarIcon: 'bx-sun',
  },
  {
    amount: 2200, // 2200 kWh for Fashion category
    title: 'Wind Power',
    avatarColor: 'success',
    subtitle: 'Wind Turbines, Wind Farms',
    avatarIcon: 'bx-cloud',
  },
  {
    amount: 1499.69, // 1499.69 kWh for Decor category
    title: 'Hydropower',
    avatarColor: 'info',
    subtitle: 'Hydroelectric Plants, Small Dams',
    avatarIcon: 'bx-water',
  },
  {
    amount: 960, // 960 kWh for Sports category (smaller energy demand)
    title: 'Geothermal Energy',
    avatarColor: 'secondary',
    subtitle: 'Geothermal Heat Pumps, Hot Springs',
    avatarIcon: 'bx-capsule',
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
  <VCard>
    <VCardItem class="energy-card">
      <VCardTitle>
        Daily Energy Statistics
      </VCardTitle>
      <VCardSubtitle>8159.69 kWh transferred </VCardSubtitle>

      <template #append>
        <MoreBtn :menu-list="moreList" />
      </template>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center justify-space-between mb-6">
        <div class="">
          <h3 class="text-h3 mb-1">
            147
          </h3>
          <div class="text-caption text-medium-emphasis">
            Total Orders
          </div>
        </div>
      </div>

      <VList class="card-list">
        <VListItem
          v-for="order in orders"
          :key="order.title"
        >
          <template #prepend>
            <VAvatar
              size="40"
              rounded
              variant="tonal"
              :color="order.avatarColor"
            >
              <VIcon :icon="order.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ order.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-body-2">
            {{ order.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <span>{{ order.amount }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.card-list {
  --v-card-list-gap: 1.25rem;
}
.energy-card {
  width: 100%;
  max-width: 500px; /* Limit card width */
  margin: 16px auto;
  padding: 16px;
  height: 110px;
}
</style>
