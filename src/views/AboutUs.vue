<script
    setup
    lang="ts"
>
  import PageHeader from "@/components/sections/PageHeader.vue";
  import SectionGrid from "@/components/sections/SectionGrid/SectionGrid.vue";
  import Gallery from "@/components/sections/Gallery.vue";
  import OurAdvantages from "@/components/sections/OurAdvantages.vue";
  import Licences from "@/components/sections/Licences.vue";
  import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <PageHeader />
  <SectionGrid />
  <Gallery />
  <OurAdvantages />
  <Licences />
  <Footer :theme="'dark'" />

</template>

<style scoped>

</style>