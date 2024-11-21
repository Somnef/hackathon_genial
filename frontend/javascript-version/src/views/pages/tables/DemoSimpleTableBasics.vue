<script setup>
const desserts = [
  {
    transaction: '001',
    date: 2024-11-20,
    source: 6,
    destination: 24,
    energy: 4092,
  },
 
]
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Transaction ID
        </th>
        <th>
          Date
        </th>
        <th>
          User ID Source
        </th>
        <th>
          User ID Destination
        </th>
        <th>
          Energy
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.dessert"
      >
        <td>
          {{ item.transaction }}
        </td>
        <td>
          {{ item.date }}
        </td>
        <td>
          {{ item.source }}
        </td>
        <td>
          {{ item.destination }}
        </td>
        <td>
          {{ item.energy }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
