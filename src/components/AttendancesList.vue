<template>
  <div
    v-for="attendance in attendances"
    :key="attendance.id"
    class="flex flex-col mb-3"
  >
    <div
      class="bg-white rounded-lg shadow-sm px-4 sm:px-8 py-3 sm:py-6 flex items-center justify-between"
    >
      <div class="sm:w-1/3 flex items-center">
        <div class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300">
          <svg
            class="fill-current w-5 h-5 text-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"
            />
          </svg>
        </div>

        <div class="ml-5 flex flex-col w-full">
          <h3 class="truncate font-semibold text-xs sm:text-sm 2xl:text-base">
            {{ attendance.created_at }}
          </h3>
        </div>
      </div>

      <div class="flex items-center py-3 pl-6 md:pl-10">
        <svg
          class="fill-current w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"
          />
        </svg>

        <p class="ml-3 text-sm">
          {{ attendance.started_at }} - {{ attendance.ended_at }}
        </p>
      </div>

      <div
        class="font-medium text-xs sm:text-sm text-right"
        v-if="attendance.attendance_responds[0]"
      >
        <span class="hidden sm:inline-block pr-2">Your status:</span>
        <span
          class="capitalize"
          :class="statusLabelStyle(attendance.attendance_responds[0].status)"
        >
          {{ attendance.attendance_responds[0].status }}
        </span>
      </div>

      <button
        v-if="user.role.name == 'Teacher'"
        class="ring-red-400 ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-4 rounded"
      >
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

    <div
      class="flex items-center justify-end"
      v-if="!attendance.attendance_responds[0]"
    >
      <button
        @click.prevent="submitAttendance(attendance.id, 'attend')"
        class="flex items-center border bg-green-500 border-green-500 text-white px-4 py-1 rounded-bl-lg transition duration-100 ease-in-out transform hover:bg-green-600 hover:border-green-600 focus:translate-y-1 hover:text-white focus:outline-none"
      >
        <svg
          class="fill-current w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"
          />
        </svg>
        <span class="inline-block ml-2 text-xs sm:text-sm">Attend</span>
      </button>

      <button
        @click.prevent="submitAttendance(attendance.id, 'not attend')"
        class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-br-lg transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
      >
        <svg
          class="fill-current w-4 h-4 stroke-current stroke-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
          />
        </svg>
        <span class="inline-block ml-2 text-xs sm:text-sm">Can't</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import useAuth from "../modules/auth";
import useAttendances from "./../modules/attendances";

export default {
  name: "AttendancesList",
  async setup() {
    const route = useRoute();
    const { load, attendances, storeRespond } = useAttendances();

    const user = ref(null);
    const { authUser } = useAuth();

    user.value = await authUser();

    await load(route.params.classroomId);

    function statusLabelStyle(status) {
      return {
        "text-green-500": status == "attend",
        "text-red-500": status == "not attend",
      };
    }

    async function submitAttendance(id, status) {
      await storeRespond(id, { status });
    }

    return {
      user,
      attendances,
      submitAttendance,
      statusLabelStyle,
    };
  },
};
</script>

<style>
</style>