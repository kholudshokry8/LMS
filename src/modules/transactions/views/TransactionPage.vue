<template>
  <div class="mt-4">
    <!-- <h2>All Transactions</h2> -->
    <TransactionList />
  </div>
</template>

<script>
import TransactionList from "../components/TransactionList.vue";

export default {
  components: { TransactionList }
};
</script>
