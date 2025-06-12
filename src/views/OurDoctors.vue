<script
    setup
    lang="ts"
>
import PageHeader from "@/components/sections/PageHeader.vue";
import DoctorsView from "@/components/sections/Doctors/DoctorsView.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <PageHeader />
  <DoctorsView />
  <Footer :theme="'dark'" />
</template>

<style scoped>

</style>