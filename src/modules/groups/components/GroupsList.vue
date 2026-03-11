<template>
  <div class="mt-2">
    <div
      class="d-flex flex-row justify-content-between align-items-center flex-wrap"
    >
      <div class="title">
        <h1>Group List</h1>
      </div>
      <div class="buttons d-flex flex-row gap-2">
        <button type="button" class="btn btn-primary" @click="goToCreate">
          Create
        </button>
      </div>
    </div>
    <BaseLoading v-if="store.loading" />
    <div v-else>
      <BaseTable
        :columns="['name', 'course', 'date', 'days', 'studentsCount']"
        :data="store.Groups"
        :actions="{ show: true, edit: true, delete: true }"
        @show="showGroup"
        @edit="editGroup"
        @delete="deleteGroup"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGroupsStore } from "../store/GroupsStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const router = useRouter();
const store = useGroupsStore();

const showGroup = (group) => {
  router.push({ name: "GroupDetails", params: { id: group.original.id } });
};
const editGroup = (group) => {
  // لو الـ id موجود جوه group.original.id
  const groupId = group.id || group.original?.id;

  if (groupId) {
    router.push({ name: "EditGroup", params: { id: groupId } });
  } else {
    console.warn("Group ID not found");
  }
};

const deleteGroup = (group) => {
  if (confirm(`Are you sure you want to delete ${group.Name}?`)) {
    console.log("Deleting course:", group);
    store.deleteGroup(group.original.id);
  }
};

const goToCreate = () => {
  router.push({ name: "CreateGroup" }); // التنقل إلى صفحة الإنشاء
};

const goToEdit = () => {
  router.push({ name: "EditGroup" }); // التنقل إلى صفحة التعديل
};

onMounted(() => {
  store.fetchGroups();
});
</script>
