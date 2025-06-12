// App.vue

<script
    setup
    lang="ts"
>
import Header from "@/components/layout/Header.vue";// Возможно, у вас будет и футер
// import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header />

  <main>
    <router-view />
  </main>

</template>

<style scoped>
</style>