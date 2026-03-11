import { defineStore } from "pinia";
import { ref } from "vue";

export const useParentStore = defineStore("parent", () => {
  const stats = ref([]);
  const children = ref([]);
  const courses = ref([]);
  const loading = ref(false);
  const courseLoading = ref(false);

  // Fetch Parent Data
  const fetchParentData = async () => {
    loading.value = true;
    console.log("📢 Fetching Parent Data...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay

    stats.value = [
      { label: "Registered Courses", value: 5 },
      { label: "Certificates Earned", value: 3 },
      { label: "Completed Projects", value: 2 },
      { label: "Overall Rating", value: 90 },
    ];

    children.value = [
      {
        id: 1,
        name: "Ahmed",
        age: 12,
        enrolledCourses: 3,
        lastRating: 85,
        image: "child1.png",
        certificates: [
          { id: 1, name: "Mathematics Excellence" },
          { id: 2, name: "Science Fair Winner" }
        ],
        attendance: 90,
        grades: [
          { course: "Math", score: 95 },
          { course: "Science", score: 88 }
        ],
        projects: [
          { id: 1, title: "Solar System Model", description: "A project on planetary orbits." },
          { id: 2, title: "Physics Experiment", description: "Testing Newton's Laws." }
        ]
      },
      {
        id: 2,
        name: "Sarah",
        age: 10,
        enrolledCourses: 4,
        lastRating: 92,
        image: "child2.png",
        certificates: [
          { id: 1, name: "Creative Writing Award" },
          { id: 2, name: "Best Art Project" }
        ],
        attendance: 95,
        grades: [
          { course: "English", score: 90 },
          { course: "Art", score: 98 }
        ],
        projects: [
          { id: 1, title: "Storybook Writing", description: "Created a children's book." },
          { id: 2, title: "Painting Masterpiece", description: "An acrylic painting on canvas." }
        ]
      },
      
    ];

    loading.value = false;
    console.log("✅ Parent Data Loaded: ", children.value);
  };

  // Fetch New Courses
  const fetchCourses = async () => {
    courseLoading.value = true;
    console.log("📢 Fetching Courses...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay

    courses.value = [
      {
        id: 1,
        name: "JavaScript Basics",
        instructor: "John Doe",
        description: "Learn the fundamentals of JavaScript.",
        content: ["Introduction", "Variables", "Functions"],
        sessions: 10,
        price: 50,
        category: "Programming",
        image: "js-course.jpg",
      },
      {
        id: 2,
        name: "UI/UX Design",
        instructor: "Jane Smith",
        description: "Master UI/UX design principles.",
        content: ["Typography", "Color Theory", "Wireframes"],
        sessions: 8,
        price: 75,
        category: "Design",
        image: "ux-course.jpg",
      },
      {
        id: 3,
        name: "Digital Marketing",
        instructor: "Mark Lee",
        description: "Become a digital marketing expert.",
        content: ["SEO", "Social Media", "Email Marketing"],
        sessions: 12,
        price: 100,
        category: "Marketing",
        image: "marketing-course.jpg",
      },
    ];

    courseLoading.value = false;
    console.log("✅ Courses Loaded: ", courses.value);
  };

  // Get Course Details by ID
  const getCourseById = (id) => {
    return courses.value.find(course => course.id === id) || null;
  };

  return {
    stats,
    children,
    courses,
    loading,
    courseLoading,
    fetchParentData,
    fetchCourses,
    getCourseById,
  };
});
