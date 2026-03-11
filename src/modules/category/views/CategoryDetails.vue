<template>
  <div v-if="store.loading">Loading...</div>
  <div v-else-if="store.category" class="category-details">
    <h2>{{ store.category.title }}</h2>
    <img :src="store.category.image" alt="Category Image" />
    <p>{{ store.category.description }}</p>
  </div>
</template>

<script setup>
import { useCategoryStore } from "../store/categoryStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const store = useCategoryStore();
const route = useRoute();

onMounted(() => {
  store.fetchCategory(route.params.id);
});
</script>

