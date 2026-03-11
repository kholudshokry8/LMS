<template>
  <div class="mt-2">
    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
      <div class="title">
        <h1>Transactions List</h1>
      </div>
   
    </div>

    <BaseLoading v-if="store.loading" />
    
    <div v-else>
      <BaseTable
  :columns="['name', 'phone','courseName', 'payment', 'status', 'paymentDate']"
  :data="store.Transactions"
/>

 
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTransactionsStore } from "../store/TransactionStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
import { useRouter } from "vue-router";

const store = useTransactionsStore();
const router = useRouter();

const showTransaction = (transaction) => {
  alert(`Showing transaction: ${transaction.name}`);
};

const editTransaction = (transaction) => {
  router.push(`/edit-transaction/${transaction.id}`);
};

const deleteTransaction = (transaction) => {
  if (confirm(`Are you sure you want to delete ${transaction.name}?`)) {
    console.log("Deleting transaction:", transaction);
    store.deleteTransaction(transaction.id);
  }
};

const goToCreateTransaction = () => {
  router.push("/create-transaction");
};


onMounted(() => {
  store.fetchTransactions();
});
</script>

<style>
.container {
  padding: 20px;
}
.header {
  text-align: center;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 35%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input, select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.btn {
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
}
.btn-primary {
  background-color: blue;
  color: white;
}
.btn-success {
  background-color: green;
  color: white;
}
.btn-secondary {
  background-color: gray;
  color: white;
}
</style>
