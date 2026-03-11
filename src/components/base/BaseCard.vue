<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  border-radius: 12px; /* زوايا مستديرة */
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0); /* تأثير ناعم */
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* تأثير عند تمرير الماوس */
.base-card:hover {
  transform: translateY(-5px);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.9);
}
</style>
