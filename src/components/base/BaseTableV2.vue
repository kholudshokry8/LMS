<template>
  <div class="table-container">
    <div class="scrollable-container">
      <table class="table scrollable-table">
        <!-- =================== رأس الجدول =================== -->
        <thead>
          <tr>
            <th v-for="(label, key, index) in columns" :key="index">
              {{ label }}
            </th>
            <th v-if="hasActions">Actions</th>
          </tr>
        </thead>

        <!-- =================== جسم الجدول =================== -->
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <!-- بيانات الأعمدة -->
            <td v-for="(label, key, colIndex) in columns" :key="colIndex">
              <!-- زر الحضور للعمود attended -->
              <template v-if="key === 'attended'">
                <button
                  @click="$emit('action', row)"
                  :class="[
                    'btn btn-sm',
                    row.attended.isPresent
                      ? 'btn-success '
                      : 'btn-outline-secondary '
                  ]"
                  :disabled="row.attended.isPresent"
                >
                  {{ row.attended.isPresent ? "Present" : "Absent" }}
                </button>
              </template>

              <!-- الأعمدة العادية -->
              <template v-else>
                {{ row[key] }}
              </template>
            </td>

            <!-- أعمدة الأكشنز -->
            <td v-if="hasActions" class="action-icons">
              <button
                v-if="actions?.show"
                @click="$emit('show', row)"
                class="btn btn-outline-primary btn-sm"
              >
                <i class="bi bi-eye"></i>
              </button>

              <button
                v-if="actions?.edit"
                @click="$emit('edit', row)"
                class="btn btn-outline-success btn-sm mx-1"
              >
                <i class="bi bi-pencil"></i>
              </button>

              <button
                v-if="actions?.delete"
                @click="$emit('delete', row)"
                class="btn btn-outline-danger btn-sm"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- أزرار خاصة بالأدمن -->
  <button
    v-if="userRole === 'admin'"
    @click="$emit('adminCertificates')"
    class="btn btn-outline-info btn-sm mt-4"
  >
    <i class="bi bi-award"></i> Certificates
  </button>

  <button
    v-if="userRole === 'admin'"
    @click="$emit('goToAllSessions')"
    class="btn btn-outline-warning btn-sm mt-4"
  >
    <i class="bi bi-calendar-week"></i> All Sessions
  </button>
</template>

<script setup>
import { computed } from "vue";

/* ============ Props ============ */
const props = defineProps({
  // الأعمدة الآن كائن { key: title }
  columns: Object,
  data: Array,
  actions: Object,
  userRole: String
});

/* ============ Computed ============ */
const hasActions = computed(
  () => props.actions?.show || props.actions?.edit || props.actions?.delete
);

/* ============ Emits ============ */
defineEmits([
  "action",
  "show",
  "edit",
  "delete",
  "toggle-attendance", // جديد
  "adminCertificates",
  "goToAllSessions"
]);
</script>

<!-- ========= نفس الـ CSS الذي كان لديك ========= -->
<style scoped>
/* Main table container */
.table-container {
  width: 99%;
  margin: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0;
  overflow-x: auto;
}
.scrollable-container {
  max-height: 81vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;
}
.scrollable-container::-webkit-scrollbar {
  width: 8px;
}
.scrollable-container::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 5px;
}
.scrollable-container::-webkit-scrollbar-thumb {
  background: #c65020;
  border-radius: 5px;
}
.scrollable-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}
thead th {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #e75d24, #c65020);
  color: white;
  text-align: left;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  z-index: 2;
}
tbody td {
  padding: 14px;
  border-bottom: 1px solid #ddd;
  background: white;
  color: #4e5566;
  font-size: 14px;
  word-break: break-word;
}
tbody tr:nth-child(even) td {
  background: #f3f4f6;
}
tbody tr:hover td {
  background: #ffe8e0;
  transition: background 0.3s ease-in-out;
}
@media screen and (max-width: 1024px) {
  .table-container {
    width: 95%;
  }
  .scrollable-container {
    max-height: 55vh;
  }
}
@media screen and (max-width: 768px) {
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
  .scrollable-container {
    max-height: 50vh;
  }
  .scrollable-table {
    font-size: 14px;
  }
  thead th,
  tbody td {
    padding: 10px;
    font-size: 14px;
  }
}
@media screen and (max-width: 425px) {
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
  .scrollable-container {
    overflow-x: auto;
    max-height: 40vh;
  }
  .scrollable-table {
    min-width: 600px;
  }
  .action-icons button {
    padding: 5px;
    font-size: 12px;
  }
}
</style>
