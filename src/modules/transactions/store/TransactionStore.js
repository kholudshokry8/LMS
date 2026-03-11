// src/store/TransactionStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // تأكدي إنه موجود ومربوط

export const useTransactionsStore = defineStore("Transactions", () => {
  const Transactions = ref([]);
  const loading = ref(false);

  const fetchTransactions = async () => {
    loading.value = true;
    try {
      const response = await api.get("/transactions");
      // تحويل البيانات حسب الحاجة
      Transactions.value = response.data.transactions.map((t) => ({
        id: t.id,
        name: t.student_name,
        phone: t.parent_phone,
      
        courseName: t.course_name, // لو عندك كورس اربطيه هنا
        payment: t.amount + " EGP",
        status: t.status,
        paymentDate: t.paid_at,
      }));
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      loading.value = false;
    }
  };

  const deleteTransaction = (id) => {
    Transactions.value = Transactions.value.filter(
      (transaction) => transaction.id !== id
    );
  };

  return { Transactions, loading, fetchTransactions, deleteTransaction };
});
