<template>
  <div
    v-for="announcement in announcements"
    :key="announcement.id"
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
            d="M10 5h-5.033c-2.743 0-4.967 2.239-4.967 5 0 2.762 2.224 5 4.967 5h5.033v-10zm2.007 17.475c-.52-.424-.902-.994-1.095-1.637l-1.151-3.827h-5.125l1.905 5.883c.214.659.828 1.106 1.521 1.106h3.439c.358 0 .677-.225.797-.562.12-.337.015-.713-.263-.939l-.028-.024zm-.007-17.475v2.014c3.088-.445 6.379-1.603 10-3.544v13.064c-3.607-1.924-6.958-3.109-10-3.548v2.014c3.164.509 7.16 1.992 12 5v-20c-4.964 3.085-8.877 4.502-12 5z"
          />
        </svg>
      </div>

      <div class="ml-5 flex flex-col w-full">
        <h3 class="truncate font-semibold text-sm">{{ announcement.title }}</h3>
        <p class="mt-1 text-sm">Posted at {{ announcement.created_at }}</p>
      </div>
    </div>

    <div class="flex space-x-6">
      <button
        @click="
          $router.push({
            name: 'AnnouncementDetail',
            params: {
              classroomId: $route.params.classroomId,
              announcementId: announcement.id,
            },
          })
        "
        class="flex items-center border border-red-500 text-red-500 px-4 py-1 text-sm rounded-full transition duration-100 ease-in-out hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none"
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

      <button v-if="user.role.name == 'Teacher'">
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import useAnnoucements from "./../modules/announcements";
import useAuth from "../modules/auth";

export default {
  name: "AnnoucementsList",
  async setup() {
    const route = useRoute();
    const { load, announcements } = useAnnoucements();

    const user = ref(null);
    const { authUser } = useAuth();

    user.value = await authUser();

    await load(route.params.classroomId);

    return {
      announcements,
      user,
    };
  },
};
</script>
