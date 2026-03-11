<template>
  <div class="">
    <div class="row">
      <div
        v-for="(card, index) in store.studentStats"
        :key="index"
        class="col-lg-3 col-md-6 col-sm-12"
      >
        <div class="stat-card" :style="{ backgroundColor: card.color }">
          <div class="content">
            <div class="stat-number">{{ card.value }}</div>
            <div class="stat-title">{{ card.title }}</div>
          </div>
          <div class="icon">
            <i :class="card.icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStudentStore } from "../store/studentStore";

export default {
  setup() {
    const store = useStudentStore();

    onMounted(() => {
      store.fetchStudentData();
    });

    return { store };
  }
};
</script>

<style scoped>
.container {
  max-width: 90vw;
  margin-top: 2rem;
}

.stat-card {
  padding: 2rem;
  border-radius: 0.75rem;
  color: white;
  text-align: left;
  min-height: 22vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
}

.stat-title {
  font-size: 1.1rem;
  margin-top: 0.3rem;
}

.icon {
  font-size: 4rem;
  position: absolute;
  right: 10%;
  bottom: 20%;
  opacity: 0.2;
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.stat-card:hover .icon {
  transform: scale(1.2);
  opacity: 0.35;
}
</style>
