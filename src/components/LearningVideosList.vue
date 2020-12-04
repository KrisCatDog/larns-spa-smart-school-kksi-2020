<template>
  <div
    v-for="classVideo in classVideos"
    :key="classVideo.id"
    class="bg-white rounded-md shadow-sm px-8 py-6 mb-3 flex items-center justify-between"
  >
    <div class="w-1/2 sm:w-1/3 pr-10 flex items-center">
      <div class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300">
        <svg
          class="fill-current w-5 h-5 text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
          />
        </svg>
      </div>

      <div class="ml-5 flex flex-col w-full">
        <h3 class="truncate font-semibold text-sm">
          {{ classVideo.title }}
        </h3>
        <p class="mt-1 text-sm">Posted at Nov 13</p>
      </div>
    </div>

    <div class="flex">
      <button
        @click="
          $router.push({
            name: 'LearningVideoDetail',
            params: {
              classroomId: $route.params.classroomId,
              learningVideoId: classVideo.id,
            },
          })
        "
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
import { useRoute } from "vue-router";
import useClassVideos from "../modules/class-videos";

export default {
  name: "LearningVideosList",
  async setup() {
    const route = useRoute();

    const { load, classVideos } = useClassVideos();

    await load(route.params.classroomId);

    return {
      classVideos,
    };
  },
};
</script>

<style>
</style>