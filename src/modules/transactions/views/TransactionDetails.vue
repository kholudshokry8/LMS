<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="transaction">
    <h2>{{ transaction.title }}</h2>
    <img :src="transaction.image" alt="transaction Image" />
    <p>{{ transaction.description }}</p>
  </div>
</template>

<script>
import { useTransactionsStore } from "../store/TransactionStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useTransactionsStore();
    const route = useRoute();

    onMounted(() => {
      store.fetchTransaction(route.params.id);
    });

    return {
      course: store.transaction,
      loading: store.loading,
    };
  },
};
</script>
