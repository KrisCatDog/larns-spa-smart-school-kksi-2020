<template>
  <nav
    id="nav"
    class="flex justify-between items-center px-8 sm:px-16 py-3 sm:py-5 border-b bg-white"
  >
    <img src="./../assets/logo.svg" alt="larns logo" class="w-20" />

    <div class="hidden items-center md:flex">
      <router-link
        :to="{ name: 'Attendances' }"
        class="text-black-300 font-semibold px-3 flex items-center"
      >
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"
          />
        </svg>

        <span class="inline-block pb-1 ml-2 text-sm">Attendances</span>
      </router-link>

      <router-link
        :to="{ name: 'Assignments' }"
        class="text-black-300 font-semibold px-3 flex items-center"
      >
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
          />
        </svg>

        <span class="inline-block pb-1 ml-2 text-sm">Assignments</span>
      </router-link>

      <router-link
        :to="{ name: 'Announcements' }"
        class="text-black-300 font-semibold px-3 flex items-center"
      >
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5h-5.033c-2.743 0-4.967 2.239-4.967 5 0 2.762 2.224 5 4.967 5h5.033v-10zm2.007 17.475c-.52-.424-.902-.994-1.095-1.637l-1.151-3.827h-5.125l1.905 5.883c.214.659.828 1.106 1.521 1.106h3.439c.358 0 .677-.225.797-.562.12-.337.015-.713-.263-.939l-.028-.024zm-.007-17.475v2.014c3.088-.445 6.379-1.603 10-3.544v13.064c-3.607-1.924-6.958-3.109-10-3.548v2.014c3.164.509 7.16 1.992 12 5v-20c-4.964 3.085-8.877 4.502-12 5z"
          />
        </svg>

        <span class="inline-block pb-1 ml-2 text-sm">Announcements</span>
      </router-link>

      <router-link
        :to="{ name: 'LearningVideos' }"
        class="text-black-300 font-semibold px-3 flex items-center"
      >
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
          />
        </svg>

        <span class="inline-block pb-1 ml-2 text-sm">Learning Videos</span>
      </router-link>

      <router-link
        :to="{ name: 'Discussions' }"
        class="text-black-300 font-semibold px-3 flex items-center"
      >
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z"
          />
        </svg>

        <span class="inline-block pb-1 ml-2 text-sm">Discussions</span>
      </router-link>
    </div>

    <div class="relative">
      <div
        @click="isAccountModalActive = !isAccountModalActive"
        class="ml-6 w-10 h-10 bg-gray-200 rounded-full"
      >
        <img
          src="https://placekitten.com/200/202"
          alt=""
          class="w-full h-full rounded-full"
        />
      </div>

      <div
        v-if="isAccountModalActive"
        class="absolute top-12 right-0 w-44 bg-white shadow-md border rounded-md py-1 z-50"
      >
        <p class="px-4 py-2 text-xs tracking-wide">Manage Account</p>

        <button
          @click="submitLogout"
          class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
        >
          <div class="inline-block text-sm">Logout</div>
        </button>
      </div>
    </div>
  </nav>

  <nav
    id="nav-responsive"
    class="-mr-4 flex items-center justify-around md:hidden fixed left-0 right-0 bottom-0 py-4 sm:py-2 px-6 border-t-2 bg-white z-50"
  >
    <router-link
      :to="{ name: 'Attendances' }"
      class="mr-4 text-black-300 font-semibold flex flex-col items-center"
    >
      <svg
        class="fill-current w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"
        />
      </svg>

      <span class="hidden sm:inline-block text-xs font-regular"
        >Attendances</span
      >
    </router-link>

    <router-link
      :to="{ name: 'Assignments' }"
      class="mr-4 text-black-300 font-semibold flex flex-col items-center"
    >
      <svg
        class="fill-current w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
        />
      </svg>

      <span class="hidden sm:inline-block text-xs font-regular"
        >Assignments</span
      >
    </router-link>

    <router-link
      :to="{ name: 'Announcements' }"
      class="mr-4 text-black-300 font-semibold flex flex-col items-center"
    >
      <svg
        class="fill-current w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M10 5h-5.033c-2.743 0-4.967 2.239-4.967 5 0 2.762 2.224 5 4.967 5h5.033v-10zm2.007 17.475c-.52-.424-.902-.994-1.095-1.637l-1.151-3.827h-5.125l1.905 5.883c.214.659.828 1.106 1.521 1.106h3.439c.358 0 .677-.225.797-.562.12-.337.015-.713-.263-.939l-.028-.024zm-.007-17.475v2.014c3.088-.445 6.379-1.603 10-3.544v13.064c-3.607-1.924-6.958-3.109-10-3.548v2.014c3.164.509 7.16 1.992 12 5v-20c-4.964 3.085-8.877 4.502-12 5z"
        />
      </svg>

      <span class="hidden sm:inline-block text-xs font-regular"
        >Announcements</span
      >
    </router-link>

    <router-link
      :to="{ name: 'LearningVideos' }"
      class="mr-4 text-black-300 font-semibold flex flex-col items-center"
    >
      <svg
        class="fill-current w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
        />
      </svg>

      <span class="hidden sm:inline-block text-xs font-regular"
        >Learning Videos</span
      >
    </router-link>

    <router-link
      :to="{ name: 'Discussions' }"
      class="mr-4 text-black-300 font-semibold flex flex-col items-center"
    >
      <svg
        class="fill-current w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z"
        />
      </svg>

      <span class="hidden sm:inline-block text-xs font-regular"
        >Discussions</span
      >
    </router-link>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import useAuth from "../modules/auth";

export default {
  name: "ClassroomNav",
  setup() {
    const router = useRouter();
    const isAccountModalActive = ref(false);
    const { logout } = useAuth();

    async function submitLogout() {
      await logout();

      router.push({ name: "Signin" });
    }

    return {
      isAccountModalActive,
      submitLogout,
    };
  },
};
</script>

<style scoped>
#nav a.router-link-exact-active span {
  @apply border-b-2 border-red-500 text-red-500;
}

#nav-responsive a.router-link-exact-active {
  @apply text-red-500;
}
</style>