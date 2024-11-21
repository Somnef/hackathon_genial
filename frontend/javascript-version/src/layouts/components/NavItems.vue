<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '5',
      badgeClass: 'bg-error',
      icon: 'bx-home',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
        icon: 'bx-bar-chart', // Relevant icon for Analytics
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Listings',
      icon: 'bx-list-ul', // Relevant icon for Listings
      to: '/cards',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Offers',
      icon: 'bx-dollar',
      to: '/bids',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'My Offers',
      icon: 'bx-gift', // Relevant icon for My Offers
      to: '/myoffers',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Post Offers / Sell',
      icon: 'bx-upload', // Relevant icon for Post Offers / Sell
      to: '/form-layouts',
    }"
  />
  
  <VerticalNavLink
    :item="{
      title: 'Track Trades',
      icon: 'bx-line-chart', // Relevant icon for Track Trades
      to: '/tables',
    }"
  />
</template>
