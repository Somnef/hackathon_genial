<template>
  <svg
    :height="height"
    alt="Vuestic Admin"
    fill="none"
    viewBox="0 0 478 57"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.2761 56.1386L0 13.3794H10.5519L18.8968 33.3107L27.2417 13.3794H37.7936L19.5175 56.1386H18.2761ZM62.4836 40.8281V13.3794H72.5527V39.3108C72.5527 44.8281 75.1734 46.7592 78.6907 46.7592C82.5528 46.7592 84.9666 44.8281 84.9666 39.3108V13.3794H95.1047V40.8281C95.1047 50.6213 87.7942 56.1386 78.6907 56.1386C69.2423 56.1386 62.4836 50.3454 62.4836 40.8281ZM122.415 54.7593V13.3794H149.795V22.3451H132.553V29.7935H148.485V38.6211H132.553V46.0695H150.554V54.7593H122.415Z"
      :fill="colorsComputed.start"
    />
    <path
      d="M175.933 42.6212H185.795C185.795 45.035 187.727 46.9661 190.071 46.9661C192.623 46.9661 194.209 45.5178 194.209 43.3798C194.209 40.2763 190.14 39.3798 186.761 38.2074C179.795 35.7246 175.933 32.4831 175.933 25.3796C175.933 18.0692 182.209 12.0001 190.002 12.0001C199.175 12.0001 203.52 17.8623 204.072 25.5175H194.554C194.554 23.1727 193.106 21.2416 190.278 21.2416C188.071 21.2416 185.933 22.552 185.933 25.2417C185.933 28.3452 189.727 28.8969 193.244 29.9314C200.623 32.1383 204.072 36.2763 204.072 42.7591C204.072 50.0696 197.865 56.1386 190.071 56.1386C181.037 56.1386 175.933 50.0696 175.933 42.6212Z"
      :fill="colorsComputed.start"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        gradientUnits="userSpaceOnUse"
        x1="0"
        x2="357.64"
        y1="56.1386"
        y2="56.1386"
      >
        <stop :stop-color="colorsComputed.start" />
        <stop :stop-color="colorsComputed.end" offset="1" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const { getColor } = useColors()

const props = withDefaults(
  defineProps<{
    height?: number
    start?: string
    end?: string
  }>(),
  {
    height: 28, // Default height
    start: 'primary', // Default gradient start color
    end: undefined,   // Default gradient end color (uses start if undefined)
  },
)

const colorsComputed = computed(() => ({
  start: getColor(props.start),
  end: getColor(props.end || props.start),
}))
</script>