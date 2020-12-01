<template>
  <div
    class="w-full md:flex-1 mt-5 md:mt-0 bg-white rounded-lg shadow-sm self-start"
  >
    <div class="px-8 py-6 flex items-center justify-between">
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

        <div class="ml-5 flex flex-col w-full">
          <h3 class="truncate font-semibold text-lg">
            {{ announcement.title }}
          </h3>
          <p class="mt-1 text-sm">Posted at {{ announcement.created_at }}</p>
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
        {{ announcement.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useAnnouncement from "../modules/announcements";
import { useRoute } from "vue-router";

export default {
  name: "StudentAnnouncementDetail",
  async setup() {
    const route = useRoute();
    const announcement = ref(null);
    const { show } = useAnnouncement();

    announcement.value = await show(
      route.params.classroomId,
      route.params.announcementId
    );

    return {
      announcement,
    };
  },
};
</script>