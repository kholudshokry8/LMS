<template>
  <div class="layout">
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="logo">
        <img src="@/assets/logos/Logo_w.png" alt="Logo" />
      </div>

      <button class="toggle-btn" @click="toggleSidebar">
        <i :class="isCollapsed ? 'bi bi-list' : 'bi bi-x'"></i>
      </button>

      <ul>
        <template v-for="link in filteredLinks" :key="link.path">
          <li>
            <router-link :to="link.path">
              <i :class="link.icon"></i>
              <span v-if="!isCollapsed">{{ link.name }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>

    <div class="content">
      <div class="navbar">
        <div class="user-info">
          <img class="avatar" :src="user.avatar || defaultAvatar" alt="User Avatar" />
          <span class="username">{{ user.name }}</span>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter(); // ✅ استدعاء الراوتر

// بيانات المستخدم
const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const defaultAvatar = "/default-avatar.jpg"; // صورة افتراضية في مجلد public

// التحكم في حالة السايدبار
const isCollapsed = ref(false);
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// روابط حسب الدور
const links = {
  superadmin: [
    { name: "Dashboard", path: "/", icon: "bi bi-speedometer2" },
    { name: "Courses", path: "/courses", icon: "bi bi-book" },
    { name: "Groups", path: "/groups", icon: "bi bi-collection" },
    { name: "Instructors", path: "/instructors", icon: "bi bi-person" },
    { name: "Transactions", path: "/transactions", icon: "bi bi-cash" },
    { name: "Categories", path: "/categories", icon: "bi bi-bookmarks" },
    { name: "Student", path: "/students", icon: "bi bi-person-circle" },
      // { name: "Parent", path: "/parent/dashboard", icon: "bi bi-person-circle" },
  ],
  admin: [
    { name: "Dashboard", path: "/", icon: "bi bi-speedometer2" },
    { name: "Courses", path: "/courses", icon: "bi bi-book" },
    { name: "Groups", path: "/groups", icon: "bi bi-collection" },
    { name: "Instructors", path: "/instructors", icon: "bi bi-person" },
    { name: "Transactions", path: "/transactions", icon: "bi bi-cash" },
    { name: "Categories", path: "/categories", icon: "bi bi-bookmarks" },
    { name: "Student", path: "/students", icon: "bi bi-person-circle" },
    { name: "Parent", path: "/parent/dashboard", icon: "bi bi-person-circle" },
  ],
  student: [{ name: "Student Profile", path: "/studentProfile", icon: "bi bi-book" }],
  instructor:[
    { name: "Instructor Profile", path: "/instructorProfile", icon: "bi bi-person" },
  ],
  parent: [
    { name: "Parent Profile", path: "/parentProfile", icon: "bi bi-person" },
  ],
};

const userRole = ref(user.value?.role || "guest");
const filteredLinks = computed(() => links[userRole.value] || []);

// دالة تسجيل الخروج
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  router.push("/login"); // ✅ استخدام Vue Router
};
</script>
<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  background: #1e1e2d;
  color: white;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  transition: width 0.3s ease-in-out;
}

.sidebar.collapsed {
  width: 60px;
}

.logo img {
  width: 100px;
  transition: width 0.3s ease;
}

.sidebar.collapsed .logo img {
  width: 40px;
}

.toggle-btn {
  position: absolute;
  top: 10px;
  right: -40px;
  background:rgb(47, 44, 44);
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s;
  z-index: 1000;
}

.toggle-btn:hover {
  background: #e63946;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  margin-top: 20px;
}

li {
  margin-bottom: 15px;
}

a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s;
  font-size: 16px;
  width: 100%;
}

a i {
  margin-right: 10px;
  font-size: 20px;
}

.sidebar.collapsed a i {
  margin-right: 0;
}

.sidebar.collapsed a span {
  display: none;
}

a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Content */
.content {
  flex-grow: 1;
  /* padding: 20px; */
  background: #f5f5f5;
  overflow: auto;
}

/* ✅ Navbar */
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ff6600;
  padding: 10px 20px;
  /* border-radius: 8px; */
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.username {
  font-weight: bold;
  color: #333;
}

.logout-btn {
  background-color: #ff6b6b;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

}

.logout-btn:hover {
  background-color: #e63946;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 250px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }

  .sidebar.collapsed {
    transform: translateX(0);
  }

  .toggle-btn {
    left: 100%;
  }
}

</style>
