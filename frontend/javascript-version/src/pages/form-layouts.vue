<script setup>
import DemoFormLayoutVerticalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutVerticalFormWithIcons.vue';
</script>

<template>
  <div>
    <VRow>
 
      <VCol
        cols="12"
        md="6"
      >

        <!-- 👉 Vertical Form with Icons -->
        <VCard title="Post Offer">
          <VCardText>
            <DemoFormLayoutVerticalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">

      </VCol>
    </VRow>
  </div>
</template>
