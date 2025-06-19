<script
    setup
    lang="ts"
>
import HeroSection from "@/components/sections/HeroSection.vue";
import MainServices from "@/components/sections/MainServices/MainServices.vue";
import PricingSection from "@/components/sections/Pricing/PricingSection.vue";
import Contacts from "@/components/sections/Contacts.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <HeroSection />
  <MainServices />
  <PricingSection />
  <Contacts />
  <Footer :theme="'dark'" />
</template>

<style scoped>

</style>