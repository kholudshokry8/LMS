<template>
  <div class="instructor-container">
    <CreateInstructorForm
      :instructor="newInstructor"
      @save="createInstructor"
      @cancel="cancelCreate"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/axios"; // ✅ axios المخصص
import CreateInstructorForm from "../components/CreateInstructorForm.vue";

const router = useRouter();

const newInstructor = ref({
  name: "",
  email: "",
  password: "",
  phone: "",
  specialization: "",
  bio: "",
  linkedin: "",
  profile_image: null,
  courses: [],
});

// ✅ Validation
const isValidInstructor = (instructor) => {
  if (!instructor.name.trim()) return "Name is required.";
  if (!instructor.email.trim()) return "Email is required.";
  if (!instructor.password) return "Password is required.";
  if (!instructor.phone.trim()) return "Phone is required.";
  if (!instructor.specialization) return "Specialization is required.";
  if (!instructor.bio) return "Bio is required.";
  if (!instructor.linkedin) return "LinkedIn is required.";
  if (!instructor.profile_image) return "Profile image is required.";
  if (!instructor.courses.length) return "Courses are required.";
  return null;
};

// ✅ إنشاء محاضر جديد
const createInstructor = async (instructor) => {
  const validationError = isValidInstructor(instructor);
  if (validationError) {
    alert(validationError);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", instructor.name);
    formData.append("email", instructor.email);
    formData.append("password", instructor.password);
    formData.append("phone", instructor.phone);
    formData.append("specialization", instructor.specialization);
    formData.append("bio", instructor.bio);
    formData.append("linkedin", instructor.linkedin);

    if (instructor.profile_image) {
      formData.append("profile_image", instructor.profile_image);
    }

    instructor.courses.forEach(course => {
      formData.append("courses[]", course);
    });

    const response = await api.post("/instructors", formData);
    console.log("Instructor created successfully:", response.data);
    router.push("/instructors");
  } catch (error) {
    console.error("Error creating instructor:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to create instructor. Please try again.");
  }
};

const cancelCreate = () => {
  router.push("/instructors");
};

</script>
