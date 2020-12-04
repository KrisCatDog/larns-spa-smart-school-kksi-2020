<template>
  <div class="col-span-6">
    <video class="w-full max-h-120" controls>
      <source v-if="video" :src="video.attachment_video" />
      Your browser does not support the video tag.
    </video>

    <div
      class="w-full md:flex-1 mt-5 md:mt-0 bg-white rounded-lg shadow-sm self-start"
    >
      <div class="px-8 py-6 flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300"
          >
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
            <h3 class="truncate font-semibold text-lg">
              {{ video.title }}
            </h3>
            <p class="mt-1 text-sm">Posted at {{ video.created_at }}</p>
          </div>
        </div>

        <div class="flex space-x-6">
          <button
            @click="$router.go(-1)"
            class="flex items-center border border-gray-800 px-4 py-1 text-sm rounded-full transition duration-100 ease-in-out hover:bg-red-400 hover:border-red-400 hover:text-white focus:outline-none"
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
            <span class="inline-block ml-2">Back</span>
          </button>
        </div>
      </div>

      <hr />

      <div class="px-8 pt-4 pb-6">
        <p class="text-sm font-medium">
          {{ video.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useClassVideos from "./../modules/class-videos";
import { useRoute } from "vue-router";

export default {
  async setup() {
    const route = useRoute();
    const video = ref(null);

    const { show } = useClassVideos();

    video.value = await show(
      route.params.classroomId,
      route.params.learningVideoId
    );

    return {
      video,
    };
  },
};
</script>

<style>
</style>