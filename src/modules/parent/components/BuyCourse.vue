<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParentStore } from "@/modules/parent/store/parentStore.js";

const store = useParentStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.fetchParentData();
});

const courseId = computed(() => Number(route.params.id));
const course = computed(() => store.courses.find((c) => c.id === courseId.value));
const children = computed(() => store.children);
const selectedChild = ref(children.value.length ? children.value[0].id : null);
const paymentMethod = ref("credit_card");

const completePurchase = () => {
  alert(`✅ Course "${course.value.name}" purchased for child ID: ${selectedChild.value} using ${paymentMethod.value}`);
  router.push("/parent"); // Redirect after purchase
};
</script>

<template>
  <div v-if="!course" class="text-center py-5">
    <h3 class="text-danger">Course Not Found</h3>
  </div>

  <div v-else class="checkout-container">
    <div class="card checkout-card">
      <h2>Checkout</h2>

      <div class="course-details">
        <img :src="course.image" :alt="course.name" class="course-image" />
        <div>
          <h3>{{ course.name }}</h3>
          <p class="text-muted">Instructor: {{ course.instructor }}</p>
          <p><strong>Price:</strong> ${{ course.price }}</p>
        </div>
      </div>

      <h4>Select a Child</h4>
      <select v-model="selectedChild" class="form-select mb-3">
        <option v-for="child in children" :key="child.id" :value="child.id">
          {{ child.name }} (Age: {{ child.age }})
        </option>
      </select>

      <h4>Select Payment Method</h4>
      <div class="payment-methods">
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="credit_card" />
          💳 Credit Card
        </label>
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="paypal" />
          🅿️ PayPal
        </label>
      </div>

      <button class="btn btn-primary w-100 mt-3" @click="completePurchase">
        Complete Purchase
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.checkout-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: white;
}

.course-details {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.course-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}

.payment-methods {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.payment-option input {
  transform: scale(1.2);
}
</style>
