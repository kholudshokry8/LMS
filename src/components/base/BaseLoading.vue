<template>
  <div class="text-center">
    <i class="bi bi-arrow-clockwise spin-icon"></i>
  </div>
</template>

<style scoped>
.spin-icon {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
