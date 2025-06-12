<!-- views/DoctorsView.vue -->
<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {useDoctorsStore} from '@/stores/doctors';
import DoctorsSearch from '@/components/sections/Doctors/DoctorsSearch.vue';
import DoctorsGrid from '@/components/sections/Doctors/DoctorsGrid.vue'; // Переименованный импорт

const doctorsStore = useDoctorsStore();

// Инициализируем store при создании компонента
onMounted(() => {
  // Проверяем, чтобы не делать лишних запросов при возврате на страницу
  if (doctorsStore.doctors.length === 0) {
    doctorsStore.init();
  }
});
</script>

<template>
  <div class="doctors-view">
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
  </div>
</template>

<style
    scoped
    lang="scss"
>
/* Можно добавить общие стили для view или оставить пустым */
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
</style>