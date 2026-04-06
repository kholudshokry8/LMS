<template>
  <div class="table-container">
    <div class="scrollable-container">
      <table class="table scrollable-table">

        <!-- Header -->
        <thead>
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="index"
              :class="{ 'actions-column': col === 'actions' }"
            >
              {{ formatColumnName(col) }}
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
          >

            <td
              v-for="(col, colIndex) in columns"
              :key="colIndex"
              :class="{ 'actions-column': col === 'actions' }"
            >

              <!-- Actions Column -->
              <template v-if="col === 'actions'">
                <slot name="actions" :row="row"></slot>
              </template>

              <!-- Normal Columns -->
              <template v-else>
                <span v-html="row[col]"></span>
              </template>

            </td>

          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script setup>

defineProps({
  columns: Array,
  data: Array
});


// تحسين عرض اسم العمود
const formatColumnName = (col) => {

  return col
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

};

</script>

<style scoped>

.table-container {
  width: 99%;
  margin: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.scrollable-container {
  max-height: 81vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;
}

.scrollable-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

/* مهم جداً لعمود actions */
.actions-column {
  min-width: 170px;
  white-space: nowrap;
  text-align: center;
}

/* Header */

thead th {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #e75d24, #c65020);
  color: white;
  padding: 14px;
  font-size: 15px;
  font-weight: bold;
  z-index: 2;
  text-align: left;
}

/* Body */

tbody td {
  padding: 14px;
  border-bottom: 1px solid #ddd;
  background: white;
  color: #4e5566;
  font-size: 14px;
  word-break: break-word;
}

/* Zebra rows */

tbody tr:nth-child(even) td {
  background: #f3f4f6;
}

/* Hover */

tbody tr:hover td {
  background: #ffe8e0;
  transition: background 0.3s ease-in-out;
}

/* Mobile */

@media screen and (max-width: 425px) {

  .scrollable-table {
    min-width: 650px;
  }

  td button {
    padding: 5px 8px;
    font-size: 12px;
  }

}

</style>