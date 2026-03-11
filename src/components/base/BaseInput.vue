<template>
  <input class="base-input" v-bind="$attrs" />
</template>

<style scoped>
  .base-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            font-size: 1rem;
            color: #333;
            background-color: #fff;
            transition: all 0.3s ease-in-out;
            outline: none;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
        }

        /* Focus state for better accessibility */
        .base-input:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            background-color: #f8f9fa;
        }

        /* Placeholder styling */
        .base-input::placeholder {
            color: #888;
            font-size: 0.95rem;
        }

</style>
