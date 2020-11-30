<template>
  <div
    v-for="exam in state.exams"
    :key="exam.id"
    class="bg-white rounded-md shadow-sm px-8 py-6 mb-3 flex items-center justify-between"
  >
    <div class="flex items-center">
      <div class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300">
        <svg
          class="fill-current w-5 h-5 text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
          />
        </svg>
      </div>

      <div class="ml-5 flex flex-col">
        <h3 class="font-semibold text-sm">{{ exam.name }}</h3>
        <p class="mt-1 text-sm">Posted at Nov 13</p>
      </div>
    </div>

    <div class="flex">
      <button
        class="flex items-center border border-red-500 text-red-500 px-4 py-1 mr-6 text-sm rounded-full transition duration-100 ease-in-out hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none"
      >
        <svg
          class="fill-current w-4 h-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
          />
        </svg>
        <span class="inline-block ml-2">Detail</span>
      </button>

      <button>
        <svg
          class="fill-current w-4 h-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "ExamsList",
  async setup() {
    const route = useRoute();
    const state = reactive({ exams: [] });

    const response = await axios.get(
      `/classrooms/${route.params.classroomId}/exams`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    state.exams = response.data.data;

    return {
      state,
    };
  },
};
</script>

<style>
</style>