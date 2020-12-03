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
        v-if="attendance.attendance_responds[0] && user.role.name == 'Student'"
      >
        <span class="hidden sm:inline-block pr-2">Your status:</span>
        <span
          class="capitalize"
          :class="
            statusLabelStyle(
              setAttendanceStatus(attendance.attendance_responds).status
            )
          "
        >
          {{ setAttendanceStatus(attendance.attendance_responds).status }}
        </span>
      </div>

      <div class="relative">
        <button
          @click.prevent="
            attendance.isSettingModalActive = !attendance.isSettingModalActive
          "
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

        <div
          v-if="attendance.isSettingModalActive"
          class="absolute top-6 right-0 w-40 bg-white shadow-md border rounded-md py-1 z-50"
        >
          <button
            @click="
              $router.push({
                name: 'AttendanceResponds',
                params: {
                  classroomId: $route.params.classroomId,
                  attendanceId: attendance.id,
                },
              })
            "
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Attendance Data</div>
          </button>

          <button
            @click="submitLogout"
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Edit</div>
          </button>

          <button
            @click="
              attendance.isDeleteModalActive = !attendance.isDeleteModalActive;
              attendance.isSettingModalActive = !attendance.isSettingModalActive;
            "
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Delete</div>
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-end"
      v-if="!attendance.attendance_responds[0] && user.role.name == 'Student'"
    >
      <button
        @click.prevent="submitAttendance(attendance.id, 'attend')"
        class="flex items-center border bg-green-500 border-green-500 text-white px-4 py-1 rounded-bl-lg hover:bg-green-600 hover:border-green-600 hover:text-white focus:outline-none"
      >
        <CircleLoading v-if="isSubmitted" />

        <svg
          v-if="!isSubmitted"
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
        class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-br-lg hover:bg-red-600 hover:border-red-600 hover:text-white focus:outline-none"
      >
        <CircleLoading v-if="isSubmitted" />

        <svg
          v-if="!isSubmitted"
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

    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      v-if="attendance.isDeleteModalActive"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Attendance at {{ attendance.created_at }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="submitDeleteAttendance(attendance.id)"
              type="submit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import useAuth from "../modules/auth";
import useAttendances from "./../modules/attendances";
import CircleLoading from "./../components/CircleLoading";

export default {
  name: "AttendancesList",
  components: {
    CircleLoading,
  },
  async setup() {
    const route = useRoute();
    const isSubmitted = ref(false);
    const { load, attendances, storeRespond, destroy } = useAttendances();

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
      isSubmitted.value = true;

      await storeRespond(id, { status });

      isSubmitted.value = false;
    }

    function setAttendanceStatus(attendanceResponds) {
      const index = attendanceResponds.findIndex(
        (attendanceRespond) => attendanceRespond.user.id === user.value.id
      );

      return attendanceResponds[index];
    }

    async function submitDeleteAttendance(id) {
      await destroy(route.params.classroomId, id);
    }

    return {
      user,
      attendances,
      submitAttendance,
      statusLabelStyle,
      isSubmitted,
      setAttendanceStatus,
      submitDeleteAttendance,
    };
  },
};
</script>

<style>
</style>