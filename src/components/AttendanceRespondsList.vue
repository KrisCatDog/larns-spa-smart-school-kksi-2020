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
            {{ attendance.created_at }}
          </h3>
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

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance Submitted At
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y divide-gray-200"
                v-if="!attendance.attendance_responds[0]"
              >
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-red-500">
                        Nobody attend the class!
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="attendanceRespond in attendance.attendance_responds"
                  :key="attendanceRespond.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="https://picsum.photos/200"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ attendanceRespond.user.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="
                        setAttendanceStatusColor(attendanceRespond.status)
                      "
                    >
                      {{ attendanceRespond.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ attendanceRespond.created_at }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import useAttendances from "../modules/attendances";

export default {
  name: "StudentAnnouncementDetail",
  async setup() {
    const route = useRoute();
    const attendance = ref(null);
    const { show } = useAttendances();

    attendance.value = await show(
      route.params.classroomId,
      route.params.attendanceId
    );

    function setAttendanceStatusColor(status) {
      return {
        "bg-green-100 text-green-800": status == "attend",
        "bg-yellow-100 text-yellow-800": status == "not attend",
        "bg-red-100 text-red-800": status == "late",
      };
    }

    return {
      attendance,
      setAttendanceStatusColor,
    };
  },
};
</script>