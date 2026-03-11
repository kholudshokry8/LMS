<template>
  <button :class="`base-button ${variant}`">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary"
  }
});
</script>

<style scoped>
.base-button {
            padding: 0.5rem 1.3rem;
            margin-top: 0.75rem;
            border-radius: 0.5rem;
            background-color: #E75D24;
            /* Primary accent color */
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
            text-decoration: none;
            transition: background 0.3s ease-in-out, transform 0.2s;
            border: 1px solid #E75D24;
            cursor: pointer;
            text-transform: capitalize;

        }
        .base-button:hover{
            background-color: white; /* Primary accent color */
            color: #E75D24;
            border: 1px solid #8C94A3;
            transform: translateY(-0.125rem);
        }
.primary {
  background: blue;
  color: white;
}
.secondary {
  background: gray;
  color: white;
}
.danger {
  background: red;
  color: white;
}
</style>
