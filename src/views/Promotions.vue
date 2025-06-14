<script
    setup
    lang="ts"
>
  import PageHeader from "@/components/sections/PageHeader.vue";
  import PromotionsSection from "@/components/sections/PromotionsSection.vue";
  import AppointmentForm from "@/components/sections/AppointmentForm.vue";
  import Licences from "@/components/sections/Licences.vue";
  import Footer from "@/components/layout/Footer.vue";

</script>

<template>
  <PageHeader />
  <PromotionsSection />
  <AppointmentForm />
  <Licences />
  <Footer :theme="'light'" />
</template>

<style scoped>

</style>