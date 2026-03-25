<template>
  <BaseLoading v-if="loading" />

  <div v-else-if="Group" class="container py-4">
    <!-- بيانات الجروب والكورس -->
    <h2 class="mb-2">Group: {{ Group.name }}</h2>

    <div class="card mb-4 p-3">
      <h3>{{ Group.course?.title }}</h3>

      <!-- ✅ صورة آمنة -->
      <img
        v-if="Group.course?.image"
        :src="getImageUrl(Group.course.image)"
        @error="onImageError"
        alt="Course Image"
        class="img-fluid my-2"
        style="max-width: 400px"
      />

      <p>{{ Group.course?.description }}</p>

      <p><strong>Start Date:</strong> {{ Group.start_date }}</p>
      <p><strong>End Date:</strong> {{ Group.end_date }}</p>

      <p>
        <strong>Days:</strong>
        {{ parsedDays }}
      </p>

      <p><strong>Max Students:</strong> {{ Group.max_students }}</p>
      <p><strong>Current Students:</strong> {{ Group.students?.length || 0 }}</p>
    </div>

    <!-- جدول الطلاب -->
    <h4 class="table-title text-center mb-2">👨‍🎓 Students</h4>

    <BaseTable
      :columns="['name', 'email', 'phone', 'status']"
      :data="Group.students || []"
      :actions="{ show: true, edit: false, delete: false }"
      @show="showStudent"
    />

    <!-- جدول السيشنز -->
    <h4 class="table-title text-center mt-5 mb-2">🗓️ Sessions</h4>

    <BaseTable
      :columns="['id','title','date','start_time','end_time','status']"
      :data="Group.sessions || []"
      :actions="{ show: true, edit: false, delete: false }"
      class="mt-4"
      @show="showSession"
    />
  </div>
</template>

<script>
import { useGroupsStore } from "../../groups/store/GroupsStore";
import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
import { toRefs } from "vue";

export default {
  components: { BaseTable, BaseLoading },

  setup() {
    const store = useGroupsStore();
    const route = useRoute();
    const router = useRouter();

    const { Group, loading } = toRefs(store);

    // =====================
    // Load Data
    // =====================
    const loadGroup = async () => {
      if (route.params.id) {
        await store.fetchGroupById(route.params.id);
      }
    };

    // =====================
    // Navigation
    // =====================
    const showStudent = (student) => {
      const studentId = student.id || student.original?.id;

      if (studentId) {
        router.push({ name: "StudentDetails", params: { id: studentId } });
      }
    };

    const showSession = (session) => {
      const sessionId = session.id || session.original?.id;

      if (sessionId) {
        router.push(`/Groups/sessions/${sessionId}`);
      }
    };

    // =====================
    // Helpers
    // =====================
    const BASE_URL = "https://back.stemershub.com/";

    const getImageUrl = (path) => {
      if (!path) return "https://via.placeholder.com/400x250?text=No+Image";
      return BASE_URL + path;
    };

    const onImageError = (e) => {
      e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
    };

    const parsedDays = computed(() => {
      try {
        return Group.value?.days
          ? JSON.parse(Group.value.days).join(", ")
          : "Not Set";
      } catch {
        return "Not Set";
      }
    });

    // =====================
    // Lifecycle
    // =====================
    onMounted(loadGroup);
    watch(() => route.params.id, loadGroup);

    return {
      Group,
      loading,
      showStudent,
      showSession,
      getImageUrl,
      onImageError,
      parsedDays,
    };
  },
};
</script>