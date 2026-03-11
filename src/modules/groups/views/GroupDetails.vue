<template>
  <BaseLoading v-if="loading" />

  <div v-else-if="Group" class="container py-4">
    <!-- بيانات الجروب والكورس -->
    <h2 class="mb-2">Group: {{ Group.name }}</h2>

    <div class="card mb-4 p-3">
      <h3>{{ Group.course?.title }}</h3>
      <img
        :src="Group.course?.image"
        alt="Course Image"
        class="img-fluid my-2"
        style="max-width: 400px"
      />
      <p>{{ Group.course?.description }}</p>

      <p><strong>Start Date:</strong> {{ Group.start_date }}</p>
      <p><strong>End Date:</strong> {{ Group.end_date }}</p>
      <p>
        <strong>Days:</strong>
        {{ Group.days ? JSON.parse(Group.days).join(", ") : "Not Set" }}
      </p>
      <p><strong>Max Students:</strong> {{ Group.max_students }}</p>
      <p><strong>Current Students:</strong> {{ Group.students?.length }}</p>
    </div>

    <!-- جدول الطلاب -->
    <h4 class="table-title text-center mb-2">👨‍🎓 Students</h4>

    <BaseTable
      :columns="{
        name: 'name',
        email: 'email',
        phone: 'phone',
        status: 'status'
      }"
      :data="Group.students"
      :actions="{ show: true, edit: false, delete: false }"
      @show="showStudent"
    />

    <!-- جدول السيشنز -->
    <h4 class="table-title text-center mt-5 mb-2">🗓️ Sessions</h4>

    <BaseTable
      :columns="{
        id: 'id',
        title: 'title',
        date: 'date',
        start_time: 'start_time',
        end_time: 'end_time',
        location: 'location',
        status: 'status'
      }"
      :data="Group.sessions"
      :actions="{ show: true, edit: false, delete: false }"
      class="mt-4"
      @show="showSession"
    />
  </div>
</template>

<script>
import { useGroupsStore } from "../../groups/store/GroupsStore";
import { onMounted, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
import { toRefs } from "vue";

export default {
  components: { BaseTable, BaseLoading },

  setup() {
    const store = useGroupsStore();
    const route = useRoute();
    const { Group, loading } = toRefs(store);
  const router = useRouter();

    const loadGroup = async () => {
      if (route.params.id) {
        await store.fetchGroupById(route.params.id);
      }
    };
  const showStudent = (student) => {
    router.push({ name: 'StudentDetails', params: { id: student.id } });
  };
  const showSession = (session) => {
  console.log("Selected session:", session);
  router.push(`/Groups/sessions/${session.id}`);
};
    // لما الصفحة تتفتح أو الـ id يتغير
    onMounted(loadGroup);
    watch(() => route.params.id, loadGroup);

    return { Group, loading ,showStudent ,showSession};
  }
};
</script>
