<template>
  <div class="transaction-container">
    <CreateTransactionForm
      :transaction="newTransaction"
      @save="createTransaction"
      @cancel="cancelCreate"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTransactionsStore } from "../store/TransactionStore";
import CreateTransactionForm from "../components/CreateTransactionForm.vue";

const store = useTransactionsStore();
const router = useRouter();

const newTransaction = ref({
  id: null,
  name: "",
  phone: "",
  email: "",
  age: null,
  courseName: "",
  payment: null,
  status: "Pending", // الحقل الافتراضي
  joinDate: "",
});

const createTransaction = () => {
  newTransaction.value.id = store.transactions.length
    ? Math.max(...store.transactions.map((t) => t.id)) + 1
    : 1;
  store.addTransaction(newTransaction.value);
  router.push("/Transactions");
};

const cancelCreate = () => {
  router.push("/Transactions");
};
</script>
