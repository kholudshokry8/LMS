import { defineStore } from "pinia";
import { ref } from "vue";
import instructorsService from "@/modules/instructors/services/instructorsService";

export const useInstructorsStore = defineStore("instructors", () => {
  const instructors = ref([]);
  const instructor = ref(null);
  const loading = ref(false);

  // جلب جميع المحاضرين
  const fetchInstructors = async () => {
    loading.value = true;
    try {
      const response = await instructorsService.getAll();
      instructors.value = response;
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      loading.value = false;
    }
  };

  // جلب محاضر واحد
  const fetchInstructor = async (id) => {
    try {
      const res = await instructorsService.getById(id);
      instructor.value = mapInstructor(res.instructor);
    } catch (err) {
      console.error("Error fetching instructor", err);
    }
  };

  // تحديث محاضر
const updateInstructor = async (updatedInstructor) => {
  try {
    const formData = new FormData();

    formData.append("_method", "PUT"); // ✅ مهم جدا

    formData.append("name", updatedInstructor.name);
    formData.append("email", updatedInstructor.email);

    if (updatedInstructor.password) {
      formData.append("password", updatedInstructor.password);
    }

    formData.append("phone", updatedInstructor.phone);
    formData.append("specialization", updatedInstructor.specialization || "");
    formData.append("bio", updatedInstructor.bio || "");
    formData.append("linkedin", updatedInstructor.linkedin || "");

    // ✅ الصورة
    if (updatedInstructor.profile_image instanceof File) {
      formData.append(
        "profile_image",
        updatedInstructor.profile_image
      );
    }
console.log(updatedInstructor.courses);
console.log(typeof updatedInstructor.courses);
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    // ✅ الكورسات
   updatedInstructor.courses.forEach((id, index) => {

  console.log("📚 Sending course:", id);

  formData.append(
    `courses[${index}]`,
    id
  );

});

    await instructorsService.update(
      updatedInstructor.id,
      formData
    );

    alert("✅ Instructor updated successfully!");

  } catch (error) {
    console.error(
      "Error updating instructor:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "❌ Failed to update instructor!"
    );
  }
};

  // مساعدة لتحويل response للـ front-end
  const mapInstructor = (data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: "", // لا نعرض الباسورد
    specialization: data.instructor?.specialization || "",
    bio: data.instructor?.bio || "",
    linkedin: data.instructor?.linkedin || "",
    profile_image: data.instructor?.profile_image || "",
    courses: data.courses?.map(c => Number(c.id)) || [],
  });

  return {
    instructors,
    instructor,
    loading,
    fetchInstructors,
    fetchInstructor,
    updateInstructor,
  };
});