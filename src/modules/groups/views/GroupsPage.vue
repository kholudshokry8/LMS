<template>
  <div class="mt-4">
      <!-- <h2>All Groups</h2> -->
       <GroupsList/>
  </div>
</template>

<script>


import CreateGroup from '../components/CreateGroup.vue';
import EditGroup from '../components/EditGroup.vue';
import GroupsList from '../components/GroupsList.vue';

export default {
  components: { GroupsList, CreateGroup, EditGroup}
};
</script>
