<template>
  <div class="mt-2 container">

    <!-- Title + Button -->
    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">

      <div class="title">
        <h1>Transactions List</h1>
      </div>

      <div class="buttons">
        <button
          class="btn btn-success"
          @click="goToCreateTransaction"
        >
          + Create Transaction
        </button>
      </div>

    </div>

    <!-- 🔍 Search -->
    <div class="row mb-3 mt-2">
      <div class="col-md-4">
        <input
          type="text"
          v-model="search"
          class="form-control"
          placeholder="Search by student, parent or status..."
        />
      </div>
    </div>

    <!-- Loading -->
    <BaseLoading v-if="store.loading" />

    <!-- Table -->
    <div v-else>

      <BaseTable
        :columns="[
          'student_name',
          'parent_name',
          'parent_phone',
          'course_name',
          'amount',
          'payment_method',
          'status',
          'transaction_reference',
          'paid_at',
          'actions'
        ]"
        :data="filteredTransactions"
      >

        <!-- Status -->
        <template #status="{ row }">
          <span
            :class="{
              'text-success fw-bold':
                row.status === 'accepted' ||
                row.status === 'success' ||
                row.status === 'paid',

              'text-danger fw-bold':
                row.status === 'rejected' ||
                row.status === 'failed',

              'text-warning fw-bold':
                row.status === 'pending'
            }"
          >
            {{ row.status }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">

          <!-- Pending -->
          <div
            v-if="row.status === 'pending'"
            class="d-flex flex-nowrap gap-2 justify-content-center"
          >

            <button
              class="btn btn-sm btn-success"
              @click="approveTransaction(row.id)"
            >
              Accept
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="rejectTransaction(row.id)"
            >
              Reject
            </button>

          </div>

          <!-- Accepted -->
          <span
            v-else-if="row.status === 'accepted'"
            class="text-success fw-bold"
          >
            Accepted
          </span>

          <!-- Rejected -->
          <span
            v-else-if="row.status === 'rejected'"
            class="text-danger fw-bold"
          >
            Rejected
          </span>

          <!-- Other -->
          <span v-else class="text-muted">
            {{ row.status }}
          </span>

        </template>

      </BaseTable>

    </div>

  </div>
</template>

<script setup>

import { onMounted, ref, computed } from "vue";
import { useTransactionsStore } from "../store/TransactionStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
import { useRouter } from "vue-router";
import api from "@/axios";

const store = useTransactionsStore();
const router = useRouter();


// 🔍 Search
const search = ref("");


// 🔎 Filtered Data
const filteredTransactions = computed(() => {

  if (!search.value) {
    return store.Transactions;
  }

  const text = search.value.toLowerCase();

  return store.Transactions.filter((item) => {

    return (

      item.student_name?.toLowerCase().includes(text) ||

      item.parent_name?.toLowerCase().includes(text) ||

      item.status?.toLowerCase().includes(text)

    );

  });

});


// Navigation
const goToCreateTransaction = () => {

  router.push("/create-transaction");

};


// Approve
const approveTransaction = async (id) => {

  try {

    await api.post(`/transactions/approve/${id}`);

    await store.fetchTransactions();

  }

  catch (err) {

    console.error("Failed to approve transaction", err);

    alert("Failed to approve transaction");

  }

};


// Reject
const rejectTransaction = async (id) => {

  try {

    await api.post(`/transactions/reject/${id}`);

    await store.fetchTransactions();

  }

  catch (err) {

    console.error("Failed to reject transaction", err);

    alert("Failed to reject transaction");

  }

};


// Load Data
onMounted(() => {

  store.fetchTransactions();

});

</script>

<style scoped>

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

/* مهم لمنع نزول الأزرار تحت */
td:last-child {

  min-width: 160px;
  white-space: nowrap;

}

button:disabled {

  opacity: 0.6;
  cursor: not-allowed;

}

.text-success {

  color: #28a745 !important;

}

.text-danger {

  color: #dc3545 !important;

}

.text-warning {

  color: #ffc107 !important;

}

</style>