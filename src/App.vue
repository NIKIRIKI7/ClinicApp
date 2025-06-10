<script
    setup
    lang="ts"
>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Licences from "@/components/Licences.vue";
</script>

<template>
  <Header />
  <Licences />
  <Footer :theme="'dark'" />
</template>

<style scoped>

</style>
