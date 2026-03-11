<template>
  <div :class="`alert alert-${type}`" role="alert">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: "success",
  },
});
</script>

<style scoped>
.alert {
  position: sticky;
  top: 0;
  z-index: 1050;
  border-radius: 6px;
  margin-bottom: 1rem;
}
</style>
