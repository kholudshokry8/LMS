import { defineStore } from "pinia";
import { ref } from "vue";
import instructorsService from "@/modules/instructors/services/instructorsService";

export const useInstructorsStore = defineStore("instructors", () => {
  const instructors = ref([]);
  const instructor = ref(null); // لتخزين بيانات محاضر واحد
  const loading = ref(false);

  // جلب المحاضرين من الـ API
  const fetchInstructors = async () => {
    loading.value = true;
    try {
      // تأكدنا من استخدام service لتجلب البيانات من الـ API
      const response = await instructorsService.getAll();
      instructors.value = response;
      instructors.value.forEach((instructor) => {
        instructor.name= instructor.user.name;
        instructor.email= instructor.user.email;
        instructor.phone= instructor.user.phone;
      });
      
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      loading.value = false;
    }
  };

  // جلب محاضر واحد بناءً على ID
const fetchInstructor = async () => {
  const id = route.params.id;
  try {
    const res = await api.get(`/instructors/${id}`);
    instructor.value = res.data.instructor; // ← دا لو الـ API بيرجع instructor جوه data
  } catch (err) {
    console.error("Error fetching instructor", err);
  }
};


  // إضافة محاضر جديد
const addInstructor = async (instructor) => {
  try {
    const formData = new FormData();
    formData.append("name", instructor.name);
    formData.append("email", instructor.email);
    formData.append("password", instructor.password);
    formData.append("phone", instructor.phone);
    formData.append("specialization", instructor.specialization);
    formData.append("bio", instructor.bio);
    formData.append("linkedin", instructor.linkedin);

    // ✅ تأكد من أن profile_image هو ملف صورة
    if (instructor.profile_image instanceof File) {
      formData.append(
        "profile_image",
        instructor.profile_image,
        instructor.profile_image.name
      );
    } else {
      alert("❌ Profile image is not a valid file.");
      console.log("🚫 profile_image is not a File:", instructor.profile_image);
      return;
    }

    instructor.courses.forEach(course => {
      formData.append("courses[]", course);
    });

    // ✅ طباعة للتأكد
    console.log("Type of profile_image:", instructor.profile_image);
    console.log("Instanceof File?", instructor.profile_image instanceof File);
    console.log("Profile image full object:", instructor.profile_image);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await api.post("/instructors", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("✅ Instructor created successfully:", response.data);
    alert("✅ Instructor created successfully!");
    router.push("/instructors");
  } catch (error) {
    console.error("❌ Error creating instructor:", error.response?.data || error);
    alert(error.response?.data?.message || "❌ Failed to create instructor. Please try again.");
  }
};


  // const addInstructor = async (newInstructor) => {
  //   try {
  //     // استخدام الخدمة لإضافة محاضر
  //     await instructorsService.create(newInstructor);
  //     await fetchInstructors(); // لتحديث القائمة بعد الإضافة
  //   } catch (error) {
  //     console.error("Error creating instructor:", error);
  //   }
  // };

  // حذف محاضر
// instructorsStore.js
const deleteInstructor = async (id) => {
  try {
    await instructorsService.delete(id);
    
    // ❌ متعمليش fetch هنا، خليه في الكومبوننت بعد التأكد من نجاح الحذف
  } catch (error) {
    // ✅ لازم نرمي الخطأ علشان يوصل للكومبوننت
    throw error;
  }
};



  // تعديل بيانات محاضر
  const updateInstructor = async (updatedInstructor) => {
    try {
      // استخدام الخدمة لتحديث المحاضر
      await instructorsService.update(updatedInstructor.id, updatedInstructor);
      await fetchInstructors(); // لتحديث القائمة بعد التعديل
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  };

  return {
    instructors,
    instructor, // إرجاع instructor لكي يمكن الوصول له في التفاصيل
    loading,
    fetchInstructors,
    fetchInstructor, // إضافة الدالة الجديدة لجلب محاضر واحد
    addInstructor,
    deleteInstructor,
    updateInstructor
  };
});
