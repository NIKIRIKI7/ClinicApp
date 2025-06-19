<script
    setup
    lang="ts"
>
import PageHeader from "@/components/sections/PageHeader.vue";
import DoctorsView from "@/components/sections/Doctors/DoctorsView.vue";
import CallbackForm from "@/components/sections/CallbackForm.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <PageHeader />
  <DoctorsView />
  <CallbackForm variant="standalone" />
  <Footer :theme="'dark'" />
</template>

<style scoped>

</style>