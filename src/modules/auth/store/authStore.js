import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import api from "@/axios"; // ✅ استيراد axios المجهز

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const errorMessages = ref({ email: "", password: "" });
  const errorMessage = ref("");
  const isAuthenticated = ref(false);
  const router = useRouter();

  if (localStorage.getItem("user")) {
    user.value = JSON.parse(localStorage.getItem("user"));
    isAuthenticated.value = true;
  }

  const login = async (email, password) => {
    errorMessages.value = { email: "", password: "" };
    errorMessage.value = "";

    try {
      const response = await api.post("/login", {
        email,
        password
      });

      if (response.data.token) {
        user.value = response.data.user;
        isAuthenticated.value = true;

        localStorage.setItem("user", JSON.stringify(user.value));
        localStorage.setItem("token", response.data.token);

        if (["admin", "superadmin"].includes(user.value.role)) {
          router.push("/");
        } else if (user.value.role === "student") {
          router.push("/studentProfile");
        }else if (user.value.role === "instructor") {
          router.push("/instructorProfile");
        }else if (user.value.role === "parent") {
          router.push("/parentProfile");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          errorMessages.value.email = errors.email ? errors.email[0] : "";
          errorMessages.value.password = errors.password
            ? errors.password[0]
            : "";
        } else if (error.response.status === 401) {
          errorMessage.value =
            "Unauthorized access. Please check your credentials.";
        } else {
          errorMessage.value =
            "An unexpected error occurred. Please try again later.";
        }
      } else {
        errorMessage.value =
          "Cannot connect to the server. Please check your internet connection.";
      }
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { user, isAuthenticated, errorMessages, errorMessage, login, logout };
});
