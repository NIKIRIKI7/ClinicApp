<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {useDoctorsStore} from '@/stores/doctors';
import DoctorsSearch from '@/components/sections/Doctors/DoctorsSearch.vue';
import DoctorsGrid from '@/components/sections/Doctors/DoctorsGrid.vue';

const doctorsStore = useDoctorsStore();

onMounted(() => {
  if (doctorsStore.doctors.length === 0) {
    doctorsStore.init();
  }
});
</script>

<template>
  <section class="doctors-view">
    <div class="container">
      <section
          class="doctors-view__search"
          aria-labelledby="search-title"
      >
        <h2
            id="search-title"
            class="visually-hidden"
        >Поиск врачей
        </h2>
        <DoctorsSearch />
      </section>
      <section
          class="doctors-view__grid"
          aria-labelledby="doctors-list-title"
      >
        <h2
            id="doctors-list-title"
            class="visually-hidden"
        >Список врачей
        </h2>
        <DoctorsGrid />
      </section>
    </div>
  </section>
</template>

<style
    scoped
    lang="scss"
>
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.doctors-view {
  margin: 0 0 rem(40px) 0;
}
</style>