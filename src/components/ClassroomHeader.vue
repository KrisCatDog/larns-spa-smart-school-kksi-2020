<template>
  <header
    class="h-14 flex justify-between items-center px-8 sm:px-16 py-3 border-b bg-white"
  >
    <div class="flex items-center">
      <h1
        class="text-sm sm:text-base font-semibold flex items-center pr-3 sm:pr-6 border-r-2"
      >
        <svg
          class="fill-current w-6 h-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path :d="svgPath" />
        </svg>

        <span class="inline-block ml-4">{{ classroom.name }}</span>
      </h1>

      <h1
        class="text-sm sm:text-base font-semibold flex items-center px-3 sm:px-6 border-r-2"
      >
        {{ classroom.grade }}
      </h1>

      <h1
        class="text-sm sm:text-base font-semibold flex items-center pl-3 sm:pl-6"
      >
        {{ classroom.major }}
      </h1>
    </div>

    <div
      v-if="user && user.role.name == 'Teacher'"
      class="bg-red-300 px-4 py-1 text-white rounded-full font-medium select-all"
    >
      {{ classroom.join_code }}
    </div>

    <router-link
      :to="{ name: 'Classrooms' }"
      class="flex items-center border border-gray-800 px-4 py-1 rounded-full transition duration-100 ease-in-out hover:bg-red-400 hover:border-red-400 hover:text-white focus:outline-none"
    >
      <svg
        class="fill-current w-4 h-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
        />
      </svg>

      <span class="hidden sm:inline-block ml-2 text-sm">My Classes</span>
    </router-link>
  </header>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import useAuth from "../modules/auth";

export default {
  props: ["svgPath"],
  name: "ClassroomHeader",
  async setup() {
    const route = useRoute();
    const { authUser } = useAuth();
    const classroom = ref({});

    const user = ref(null);

    onMounted(async () => {
      user.value = await authUser();
    });

    const response = await axios.get(
      `/classrooms/${route.params.classroomId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    classroom.value = response.data.data;

    return {
      classroom,
      user,
    };
  },
};
</script>

<style>
</style>