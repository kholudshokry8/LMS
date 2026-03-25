<template>
  <BaseLoading v-if="loading" />

  <div v-else-if="sessionData" class="container py-4">
    <!-- بيانات السيشن -->
    <div class="card p-4 mb-4">
      <h2 class="mb-2">{{ sessionData.title }}</h2>
      <p><strong>Date:</strong> {{ sessionData.date }}</p>
      <p><strong>Start Time:</strong> {{ sessionData.start_time }}</p>
      <!-- <p><strong>Location:</strong> {{ sessionData.location }}</p> -->
    </div>

    <!-- جدول الطلاب -->
    <h4>Students Attendance</h4>
    <BaseTable
      :columns="{
        id: 'ID',
        name: 'Name',
        phone: 'Phone',
        attended: 'Attended'
      }"
      :data="formattedStudents"
      :actions="{ show: false, edit: false, delete: false }"
        @action="toggleAttendance"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/axios";
import BaseTable from "@/components/base/BaseTableV2.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const route = useRoute();
const sessionData = ref(null);
const loading = ref(true);

// استدعاء البيانات
onMounted(async () => {
  try {
    const response = await api.get(`/groups/session/${route.params.id}`);
    sessionData.value = response.data;
  } catch (error) {
    console.error("Error loading session data:", error);
  } finally {
    loading.value = false;
  }
});
const toggleAttendance = async (row) => {
  try {
    const sessionId = route.params.id;

    await api.post(`/groups/sessions/${sessionId}/attendance`, {
      student_id: row.id,
    });

    /* ـــــــــــــ تحديث الـ source reactivity ـــــــــــــ */
    const target = sessionData.value?.group?.students.find(
      (s) => s.id === row.id
    );
    if (target) {
      target.attended = true;            // ← البيانات الأصلية
    }
    /* ------------------------------------------------------ */

  } catch (error) {
    console.error("Error updating attendance", error);
  }
};
// تجهيز بيانات الطلاب مع زر الحضور
const formattedStudents = computed(() => {
  return (
    sessionData.value?.group?.students.map((student) => ({
      id: student.id,
      name: student.name,
      phone: student.phone,
      attended: {
        isPresent: student.attended,
        studentId: student.id
      }
    })) || []
  );
});
</script>
