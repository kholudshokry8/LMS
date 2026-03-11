<template>
  <div class="transaction-container">
    <EditTransactionForm :transaction="editedTransaction" @save="saveChanges" @cancel="cancelEdit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTransactionsStore } from "../store/TransactionStore";
import EditTransactionForm from "../components/EditTransactionForm.vue";

const store = useTransactionsStore();
const route = useRoute();
const router = useRouter();

const editedTransaction = ref({
  id: null,
  name: "",
  phone: "",
  email: "",
  type: "",
  workMode: "",
  salary: "",
  kpis: "",
  joinDate: ""
});

onMounted(() => {
  const transactionId = Number(route.params.id);
  const transaction = store.transactions.find(inst => inst.id === transactionId);
  if (transaction) {
    editedTransaction.value = { ...transaction };
  }
});

const saveChanges = updatedTransaction => {
  store.updateTransaction(updatedTransaction);
  router.push("/transactions");
};

const cancelEdit = () => {
  router.push("/transactions");
};
</script>


