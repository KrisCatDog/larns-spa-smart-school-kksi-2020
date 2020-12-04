<template>
  <div
    class="w-full md:w-1/4 pb-4 flex flex-col bg-white rounded-md shadow-sm self-start"
  >
    <p
      class="text-center uppercase text-white bg-red-400 px-2 py-3 rounded-tl-md rounded-tr-md"
    >
      Student Work
    </p>

    <div class="flex flex-col px-4 mt-4 space-y-2">
      <div
        class="px-2 font-medium text-red-400 text-sm"
        v-if="!assignmentResults[0]"
      >
        Nobody do this!
      </div>

      <button
        v-for="assignmentResult in assignmentResults"
        :key="assignmentResult.id"
        @click="selectAssignmentResult(assignmentResult.id)"
        class="flex items-center space-x-3 border px-4 py-3 rounded focus:outline-none"
        :class="assignmentResultsColor(assignmentResult.score)"
      >
        <span class="font-medium text-sm">{{
          assignmentResult.user.name
        }}</span>
      </button>
    </div>
  </div>

  <div
    class="w-full md:flex-1 mt-5 md:mt-0 bg-white rounded-lg shadow-sm self-start"
  >
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
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
                d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
              />
            </svg>
          </div>

          <div class="ml-5 flex flex-col w-full">
            <h3 class="truncate font-semibold text-lg">
              {{ assignment.name }}
            </h3>
            <p class="mt-1 text-sm">Posted at {{ assignment.created_at }}</p>
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

      <div class="border-t border-gray-200">
        <div
          v-if="!assignmentResult"
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-red-400 font-semibold"
        >
          Select Student at Left!
        </div>

        <dl v-if="assignmentResult">
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Student Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ assignmentResult.user.name }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Assignment Submitted At
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ assignmentResult.created_at }}
            </dd>
          </div>

          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Attachments</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul
                class="border border-gray-200 rounded-md divide-y divide-gray-200"
              >
                <li
                  class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                  <div class="w-0 flex-1 flex items-center">
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2 flex-1 w-0 truncate">
                      {{ assignmentResult.file_name }}
                    </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      :href="assignmentResult.attachment_file"
                      target="_blank"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Score</dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center space-x-8"
            >
              <input
                v-model="assignmentResult.score"
                type="number"
                class="appearance-none border py-1 px-3 focus:outline-none focus:ring-1 focus:ring-red-300 rounded"
              />

              <button
                @click="
                  submitUpdateAssignmentResult(
                    assignmentResult.id,
                    assignmentResult.score
                  )
                "
                class="flex items-center border bg-green-500 border-green-500 text-white px-4 py-1 rounded-full transition duration-100 ease-in-out transform hover:bg-green-600 hover:border-green-600 focus:translate-y-1 hover:text-white focus:outline-none"
              >
                <CircleLoading v-if="isSubmitClicked" />

                <svg
                  v-else-if="!isSubmitClicked"
                  class="fill-current w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z"
                  />
                </svg>
                <span class="inline-block ml-2">Save!</span>
              </button>
            </dd>
            <dd></dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useAssignments from "../modules/assignments";
import { useRoute } from "vue-router";
import useAssignmentResults from "@/modules/assignment-results";

export default {
  name: "StudentAssignmentDetail",
  async setup() {
    const route = useRoute();
    const assignment = ref(null);
    const assignmentResult = ref(null);
    const isSubmitClicked = ref(null);
    const { show } = useAssignments();
    const {
      load,
      assignmentResults,
      show: showAssignmentResult,
      update,
    } = useAssignmentResults();

    assignment.value = await show(
      route.params.classroomId,
      route.params.assignmentId
    );

    await load(assignment.value.id);

    function assignmentResultsColor(score) {
      if (!score) {
        return "bg-gray-100 border-gray-400 text-gray-600";
      } else {
        return "bg-green-100 border-green-400 text-green-600";
      }
    }

    async function selectAssignmentResult(id) {
      assignmentResult.value = await showAssignmentResult(
        route.params.assignmentId,
        id
      );
    }

    async function submitUpdateAssignmentResult(id, score) {
      await update(route.params.assignmentId, id, { score });
    }

    return {
      assignment,
      assignmentResults,
      assignmentResult,
      selectAssignmentResult,
      isSubmitClicked,
      assignmentResultsColor,
      submitUpdateAssignmentResult,
    };
  },
};
</script>