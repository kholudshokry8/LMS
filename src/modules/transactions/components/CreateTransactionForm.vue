<template>
  <div class="container">
    <h1>Create Transaction</h1>

    <form @submit.prevent="saveTransaction">
      <!-- Parent -->
      <div class="form-group">
        <label>Parent</label>
        <select v-model="transaction.parent_id" required>
          <option value="" disabled>Select Parent</option>
          <option v-for="parent in parents" :key="parent.id" :value="parent.id">
            {{ parent.name }} ({{ parent.email }})
          </option>
        </select>
      </div>

      <!-- Student (Tom Select) -->
      <div class="form-group">
        <label>Student</label>
        <select id="student-select"></select>
      </div>

      <!-- Student Info -->
      <div class="form-group">
        <label>Student Phone</label>
        <input type="text" v-model="transaction.student_phone" required />
      </div>

      <div class="form-group">
        <label>Student Email</label>
        <input
          type="email"
          v-model="transaction.student_email"
          @blur="checkDuplicateStudent"
          required
        />
      </div>

      <div class="form-group">
        <label>Student Age</label>
        <input type="number" v-model="transaction.student_age" />
      </div>

      <!-- Course -->
      <div class="form-group">
        <label>Course</label>
        <select v-model="transaction.course_id" required>
          <option value="" disabled>Select Course</option>
          <option v-for="course in courseStore.courses" :key="course.id" :value="course.id">
            {{ course.title }}
          </option>
        </select>
      </div>

      <!-- Group -->
      <div class="form-group">
        <label>Group</label>
        <select v-model="transaction.group_id" required>
          <option value="" disabled>Select Group</option>
          <option v-for="group in courseStore.groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>

      <!-- Payment -->
      <div class="form-group">
        <label>Payment Method</label>
        <select v-model="transaction.payment_method" required>
          <option value="" disabled>Select Payment Method</option>
          <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
            {{ method.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="transaction.payment_method !== 'x-pay'">
        <label>Transaction Reference</label>
        <input type="text" v-model="transaction.transaction_reference" required />
      </div>

      <div class="form-group">
        <label>Amount</label>
        <input type="number" v-model="transaction.amount" required />
      </div>

      <button type="submit" class="btn btn-primary">Create Transaction</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css";
import api from "@/axios";

// ======= Store =======
import { useTransactionsStore } from "../store/TransactionStore";
const courseStore = useTransactionsStore();

// ======= Form Data =======
const router = useRouter();
const parents = ref([]);
const paymentMethods = ref([]);
let tom = null;

const transaction = ref({
  parent_id: null,
  student_id: null,
  student_name: "",
  student_phone: "",
  student_email: "",
  student_age: null,
  course_id: null,
  group_id: null,
  payment_method: "",
  transaction_reference: "",
  amount: null,
});

// ======= Fetch Data =======
const fetchParents = async () => {
  try {
    const res = await api.get("/parents");
    parents.value = res.data.data || [];
  } catch (err) {
    console.error(err);
  }
};

const fetchPaymentMethods = async () => {
  try {
    const res = await api.get("/payment/methods");
    paymentMethods.value = res.data.payment_methods || [];
  } catch (err) {
    console.error(err);
  }
};

// ======= Watch Course to load Groups =======
watch(
  () => transaction.value.course_id,
  async (courseId) => {
    transaction.value.group_id = null; // نفضي الـ group المختار
    if (courseId) {
      await courseStore.fetchGroupsByCourse(courseId); // fetch الجروبات النشطة للكورس
    } else {
      courseStore.groups = []; // لو مفيش كورس محدد نفضي الجروبات
    }
  }
);

// ======= TomSelect for Students =======
const initTomSelect = () => {
  tom = new TomSelect("#student-select", {
    valueField: "id",
    labelField: "label",
    searchField: ["name", "email", "phone"],
    create: true,
    maxOptions: 10,

    load: async (query, callback) => {
      if (!query.length) return callback();
      try {
        const res = await api.get(`/students?search=${query}`);
        const data = res.data.data || res.data || [];
        callback(
          data.map((s) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            phone: s.phone,
            label: `${s.name} - ${s.phone || ""} - ${s.email || ""}`,
          }))
        );
      } catch (err) {
        console.error(err);
        callback();
      }
    },

    onChange(value) {
      const selected = tom.options[value];
      if (selected && selected.id) {
        transaction.value.student_id = selected.id;
        transaction.value.student_name = selected.name;
        transaction.value.student_email = selected.email;
        transaction.value.student_phone = selected.phone;
      } else if (selected) {
        transaction.value.student_id = null;
        transaction.value.student_name = selected.name;
      }
    },

    create(input) {
      transaction.value.student_id = null;
      transaction.value.student_name = input;
      return { id: null, name: input, label: input };
    },
  });
};

// ======= Check Duplicate Student =======
const checkDuplicateStudent = async () => {
  if (!transaction.value.student_email) return;
  try {
    const res = await api.get(`/students?email=${transaction.value.student_email}`);
    const data = res.data.data || [];
    if (data.length > 0) {
      alert("Student already exists! You can add a transaction for them.");
      transaction.value.student_id = data[0].id;
      transaction.value.student_name = data[0].name;
      transaction.value.student_phone = data[0].phone;
    }
  } catch (err) {
    console.error(err);
  }
};

// ======= Save Transaction =======
const saveTransaction = async () => {
  try {
    const payload = { ...transaction.value };
    if (payload.payment_method === "x-pay") payload.transaction_reference = null;

    await api.post("/checkout", payload);
    alert("Transaction created successfully!");
    router.push("/transactions");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error occurred");
  }
};

// ======= Mounted =======
onMounted(async () => {
  await fetchParents();
  await courseStore.fetchCourses();
  await fetchPaymentMethods();
  await nextTick();
  initTomSelect();
});
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #d65622;
}
.form-group {
  margin-bottom: 15px;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}
input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 12px;
  background: #d65622;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}
button:hover {
  background: #b44c1e;
}
</style>