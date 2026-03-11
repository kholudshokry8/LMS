<template>
  <div class="container">
    <h1 class="title">Edit Transaction</h1>
    <form @submit.prevent="saveChanges" class="edit-transaction">
      <div class="form-row">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="transaction.name" required />
        </div>

        <div class="form-group">
          <label>Phone:</label>
          <input type="text" v-model="transaction.phone" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="transaction.email" required />
        </div>

        <div class="form-group">
          <label>Age:</label>
          <input type="number" v-model="transaction.age" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Course Name:</label>
          <input type="text" v-model="transaction.courseName" required />
        </div>

        <div class="form-group">
          <label>Payment:</label>
          <input type="number" v-model="transaction.payment" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Status:</label>
          <select v-model="transaction.status" required>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
        </div>

        <div class="form-group">
          <label>Join Date:</label>
          <input type="date" v-model="transaction.joinDate" required />
        </div>
      </div>

      <div class="buttons">
        <button type="submit" class="btn-save">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["transaction"]);
const emit = defineEmits(["save", "cancel"]);

const saveChanges = () => {
  emit("save", props.transaction);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  height: 90vh;
  width: 80vw;
  background: #f8f9fa;
  padding: 20px;
  margin-top: 20px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-top: 50px;
  /* margin-bottom: 30px; */
  align-self: center;
}

.edit-transaction {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}

.form-row {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 18px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn-save {
  background: #D65622;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
}


.title,label {
  color: #D65622;
  }
</style>
