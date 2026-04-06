// store/TransactionStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios";

export const useTransactionsStore = defineStore("TransactionsStore", () => {
  const Transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // ===== Fetch Transactions =====
  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await api.get("/transactions");
      Transactions.value = res.data.transactions || [];
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      error.value = err.response?.data?.message || "Error loading transactions";
    } finally {
      loading.value = false;
    }
  };

  // ===== Approve Transaction =====
  const approveTransaction = async (id) => {
    try {
      await api.post(`/transactions/approve/${id}`);
      const index = Transactions.value.findIndex(t => t.id === id);
      if (index !== -1) Transactions.value[index].status = "accepted";
    } catch (err) {
      console.error("Failed to approve transaction", err);
      throw err;
    }
  };

  // ===== Reject Transaction =====
  const rejectTransaction = async (id) => {
    try {
      await api.post(`/transactions/reject/${id}`);
      const index = Transactions.value.findIndex(t => t.id === id);
      if (index !== -1) Transactions.value[index].status = "rejected";
    } catch (err) {
      console.error("Failed to reject transaction", err);
      throw err;
    }
  };

  // ===== Delete Transaction (optional) =====
  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      Transactions.value = Transactions.value.filter(t => t.id !== id);
    } catch (err) {
      console.error("Failed to delete transaction", err);
      error.value = err.response?.data?.message || "Error deleting transaction";
    }
  };

  return {
    Transactions,
    loading,
    error,
    fetchTransactions,
    approveTransaction,
    rejectTransaction,
    deleteTransaction
  };
});