<script setup>
import { useTheme } from 'vuetify'
import statsVerticalChart from '@images/cards/chart-success.png'
import statsVerticalPaypal from '@images/cards/paypal-error.png'
import statsVerticalWallet from '@images/cards/wallet-primary.png'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const series = {
  solar: [{
    data: [
      24, // Solar Energy production (kWh)
      21,
      30,
      22,
      42,
      26,
      35,
      29,
    ],
  }],
  wind: [{
    data: [
      24, // Wind Energy production (kWh)
      21,
      30,
      25,
      42,
      26,
      35,
      29,
    ],
  }],
  hydro: [{
    data: [
      24, // Hydropower production (kWh)
      21,
      30,
      22,
      42,
      26,
      35,
      35,
    ],
  }],
  geothermal: [{
    data: [
      10, // Geothermal Energy production (kWh)
      12,
      14,
      16,
      18,
      22,
      24,
      28,
    ],
  }],
}

const currentTab = ref('solar')

const tabData = computed(() => {
  const data = {
    solar: {
      avatar: statsVerticalWallet,
      title: 'Solar Energy Transfers',
      stats: '1.2M kWh',
      efficiency: 65,
      efficiencyAmount: '7.5%',
      compareToLastWeek: '5% more than last week',
    },
    wind: {
      avatar: statsVerticalPaypal,
      title: 'Wind Energy Transfers',
      stats: '950k kWh',
      efficiency: 80,
      efficiencyAmount: '10.3%',
      compareToLastWeek: '12% less than last week',
    },
    hydro: {
      avatar: statsVerticalChart,
      title: 'Hydropower Transfers',
      stats: '450k kWh',
      efficiency: 70,
      efficiencyAmount: '5.5%',
      compareToLastWeek: '7% more than last week',
    },
    geothermal: {
      avatar: statsVerticalChart,
      title: 'Geothermal Energy Transfers',
      stats: '600k kWh',
      efficiency: 85,
      efficiencyAmount: '15.3%',
      compareToLastWeek: '3% more than last week',
    },
  }
  
  return data[currentTab.value]
})

const chartConfig = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor,
      padding: {
        left: 0,
        top: -20,
        right: 11,
        bottom: 7,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.25,
        opacityFrom: 0.5,
        stops: [
          0,
          95,
          100,
        ],
        shadeIntensity: 0.6,
        colorStops: [[
          {
            offset: 0,
            opacity: 0.4,
            color: currentTheme.primary,
          },
          {
            offset: 100,
            opacity: 0.2,
            color: currentTheme.surface,
          },
        ]],
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: currentTheme.primary,
      },
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
      ],
      offsetY: 20,
      offsetX: -24,
      labels: {
        style: {
          fontSize: '14px',
          colors: disabledTextColor,
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      min: 10,
      max: 50,
      show: false,
      tickAmount: 4,
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      offsetX: -10,
      hover: { size: 8 },
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 8,
        seriesIndex: 0,
        fillColor: '#fff',
        strokeColor: currentTheme.primary,
        dataPointIndex: series[currentTab.value][0].data.length - 1,
      }],
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <VTabs
        v-model="currentTab"
        class="v-tabs-pill"
      >
        <VTab value="solar">
          Solar Energy
        </VTab>
        <VTab value="wind">
          Wind Energy
        </VTab>
        <VTab value="hydro">
          Hydropower
        </VTab>
        <VTab value="geothermal">
          Geothermal Energy
        </VTab>
      </VTabs>
    </VCardText>

    <VCardText class="d-flex align-center gap-3">
      <VAvatar
        size="48"
        rounded
        :image="tabData.avatar"
      />

      <div>
        <p class="mb-0">
          {{ tabData.title }}
        </p>
        <div class="d-flex align-center gap-2">
          <h6 class="text-h6">
            {{ tabData.stats }}
          </h6>
          <span
            class="text-sm"
            :class="tabData.efficiency > 0 ? 'text-success' : 'text-error'"
          >
            <VIcon
              size="24"
              icon="bx-chevron-up"
            />
            {{ tabData.efficiencyAmount }}
          </span>
        </div>
      </div>
    </VCardText>

    <VCardText>
      <VueApexCharts
        type="area"
        :height="230"
        :options="chartConfig"
        :series="series[currentTab]"
      />
    </VCardText>

    <VCardText class="d-flex align-center justify-center pt-2 gap-4">
      <VProgressCircular
        size="45"
        color="primary"
        :model-value="tabData.efficiency"
      >
        <span class="text-overline text-medium-emphasis">{{ tabData.efficiency }}%</span>
      </VProgressCircular>

      <div>
        <h6 class="text-base font-weight-regular">
          <span class="text-capitalize d-inline-block">{{ currentTab }} this week</span>
        </h6>
        <span class="text-sm d-inline-block">{{ tabData.compareToLastWeek }}</span>
      </div>
    </VCardText>
  </VCard>
</template>