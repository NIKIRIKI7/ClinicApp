<script
    setup
    lang="ts"
>
  import Header from "@/components/layout/Header.vue";
  import PageHeader from "@/components/sections/PageHeader.vue";
  import SectionGrid from "@/components/sections/SectionGrid/SectionGrid.vue";
  import Gallery from "@/components/sections/Gallery.vue";
  import OurAdvantages from "@/components/sections/OurAdvantages.vue";
  import Licences from "@/components/sections/Licences.vue";
  import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <Header />
  <PageHeader />
  <SectionGrid />
  <Gallery />
  <OurAdvantages />
  <Licences />
  <Footer :theme="'dark'" />

</template>

<style scoped>

</style>