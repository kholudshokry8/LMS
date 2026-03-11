<template>
  <div class="container mt-5 pt-3 student-form">
    <h1 class="heading-custom mb-4 text-center">
      {{ isEditMode ? 'Edit Student' : 'Create New Student' }}
    </h1>

    <!-- Alerts -->
    <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
      {{ alert.message }}
    </div>

    <form @submit.prevent="saveStudent" class="p-4 shadow rounded bg-white">
      <!-- Parent Info -->
      <h5 class="section-title">Parent Information</h5>
      <div class="row mb-4">
        <div class="col-md-4" v-for="field in ['payer_name', 'payer_email', 'payer_phone']" :key="field">
          <label class="label-colored">{{ labelMap[field] }}</label>
          <input :type="getFieldType(field)" class="form-control custom-input" v-model="formData[field]" />
          <small v-if="errors[field]" class="text-danger">{{ errors[field] }}</small>
        </div>
      </div>

      <!-- Student Info -->
      <h5 class="section-title">Student Information</h5>
      <div class="row mb-4">
        <div class="col-md-4" v-for="field in ['student_name', 'student_email', 'student_phone']" :key="field">
          <label class="label-colored">{{ labelMap[field] }}</label>
          <input :type="getFieldType(field)" class="form-control custom-input" v-model="formData[field]" />
          <small v-if="errors[field]" class="text-danger">{{ errors[field] }}</small>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6">
          <label class="label-colored">Student Age</label>
          <input type="number" class="form-control custom-input" v-model="formData.student_age" />
          <small v-if="errors.student_age" class="text-danger">{{ errors.student_age }}</small>
        </div>
        <div class="col-md-6">
          <label class="label-colored">Student Language</label>
          <input type="text" class="form-control custom-input" v-model="formData.student_language" />
          <small v-if="errors.student_language" class="text-danger">{{ errors.student_language }}</small>
        </div>
      </div>

      <!-- Course & Group -->
      <h5 class="section-title">Course & Group</h5>
      <div class="row mb-4">
        <div class="col-md-6">
          <label class="label-colored">Course</label>
          <select class="form-control custom-input" v-model="formData.course_id" @change="fetchGroupsByCourse">
            <option value="">Select a course</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.title }}
            </option>
          </select>
          <small v-if="errors.course_id" class="text-danger">{{ errors.course_id }}</small>
        </div>
        <div class="col-md-6">
          <label class="label-colored">Group</label>
          <select class="form-control custom-input" v-model="formData.group_id">
            <option value="">Select a group</option>
            <option v-for="group in availableGroups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </select>
          <small v-if="errors.group_id" class="text-danger">{{ errors.group_id }}</small>
        </div>
      </div>

      <!-- Payment -->
      <div class="row mb-4">
        <div class="col-md-4">
          <label class="label-colored">Amount Paid</label>
          <input type="number" class="form-control custom-input" v-model="formData.amount_paid" />
          <small v-if="errors.amount_paid" class="text-danger">{{ errors.amount_paid }}</small>
        </div>
      </div>

      <!-- Submit -->
      <div class="text-center mt-4">
        <button type="submit" class="btn btn-lg btn-success px-5">
          {{ isEditMode ? 'Update Student' : 'Create Student' }}
        </button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStudentsStore } from '../store/studentStore';
import courseService from '../services/courseService';
import groupService from '../services/groupService';

const router = useRouter();
const route = useRoute();
const store = useStudentsStore();

const alert = ref({ type: '', message: '' });
const errors = ref({});

const studentId = ref(route.params.id);
const isEditMode = ref(!!studentId.value);

const formData = ref({
  payer_name: '',
  payer_email: '',
  payer_phone: '',
  student_name: '',
  student_email: '',
  student_phone: '',
  student_age: null,
  student_language: '',
  course_id: null,
  group_id: null,
  amount_paid: null
});

const courses = ref([]);
const availableGroups = ref([]);

const labelMap = {
  payer_name: 'Parent Name',
  payer_email: 'Parent Email',
  payer_phone: 'Parent Phone',
  student_name: 'Student Name',
  student_email: 'Student Email',
  student_phone: 'Student Phone'
};

const getFieldType = (field) => {
  if (field.includes('email')) return 'email';
  if (field.includes('phone')) return 'tel';
  return 'text';
};

const validateForm = () => {
  errors.value = {};
  const requiredFields = [
    'payer_name', 'payer_email', 'payer_phone',
    'student_name', 'student_email', 'student_phone',
    'student_age', 'student_language', 'amount_paid',
    'course_id', 'group_id'
  ];
  requiredFields.forEach(field => {
    if (!formData.value[field]) {
      errors.value[field] = 'This field is required.';
    }
  });
  return Object.keys(errors.value).length === 0;
};

const fetchCourses = async () => {
  try {
    courses.value = await courseService.fetchCourses();
  } catch (err) {
    console.error("❌ Failed to load courses:", err);
  }
};

const fetchGroupsByCourse = async () => {
  try {
    const allGroups = await groupService.fetchGroups();
    availableGroups.value = allGroups.filter(g => g.course_id === formData.value.course_id);
  } catch (err) {
    console.error("❌ Failed to load groups:", err);
  }
};

const saveStudent = async () => {
  if (!validateForm()) return;

  const dataToSend = { ...formData.value };

  try {
    if (isEditMode.value) {
      await store.updateStudent(studentId.value, dataToSend);
      alert.value = { type: 'success', message: 'Student updated successfully!' };
    } else {
      await store.addStudent(dataToSend);
      alert.value = { type: 'success', message: 'Student created successfully!' };
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });


    setTimeout(() => {
      router.push('/students');
    }, 2000);
  } catch (error) {
    alert.value = { type: 'danger', message: 'Error saving student. Please try again.' };
    console.error(error);
  }
};

onMounted(fetchCourses);

</script>

<style scoped>.student-form {
  max-width: 1000px;
}

.section-title {
  font-size: 20px;
  color: #343a40;
  font-weight: 600;
  margin-bottom: 15px;
  border-left: 4px solid #D65622;
  padding-left: 10px;
}

.custom-input {
  height: 50px;
  font-size: 1rem;
}

.label-colored {
  font-weight: 600;
  color: #D65622;
  font-size: 17px;
  margin-bottom: 6px;
  display: inline-block;
}

.heading-custom {
  color: #D65622;
  font-weight: bold;
  font-size: 36px;
}

</style>
