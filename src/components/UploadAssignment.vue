<template>
  <div
    class="w-full md:w-3/12 pb-6 flex flex-col bg-white rounded-md shadow-sm self-start"
  >
    <p
      class="text-center uppercase text-white font-bold bg-red-400 px-2 py-3 rounded-tl-md rounded-tr-md"
    >
      Upload assignment
    </p>

    <div class="flex flex-col items-center justify-evenly mt-4">
      <label
        class="px-5 flex flex-col w-full"
        v-if="assignment && checkIfUserHasUploadFile(assignment)"
      >
        <p v-if="attachment_file" class="font-medium truncate mb-5">
          {{ attachment_file.name }}
        </p>

        <div
          class="self-center flex items-center border bg-indigo-500 border-indigo-500 text-white px-4 py-1 mt-1 rounded-full transition duration-100 ease-in-out transform hover:bg-indigo-600 hover:border-indigo-600 focus:translate-y-1 hover:text-white focus:outline-none"
        >
          <CircleLoading v-if="false" />

          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 18v-10h-2.51l4.51-5.01 4.51 5.01h-2.51v10h-4zm-2 2h8v-10h5l-9-10-9 10h5v10zm11-1v3h-14v-3h-2v5h18v-5h-2z"
            />
          </svg>

          <span>Select File</span>
        </div>

        <input type="file" @change="handleFileChange" class="hidden" />
      </label>

      <button
        v-if="assignment && checkIfUserDoneUploadedFile(assignment)"
        type="submit"
        class="flex items-center border bg-green-500 border-green-500 text-white px-4 py-1 mt-3 rounded-full transition duration-100 ease-in-out transform hover:bg-green-600 hover:border-green-600 focus:translate-y-1 hover:text-white focus:outline-none"
      >
        <svg
          class="fill-current h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            fill="currentColor"
            d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"
          ></path>
        </svg>

        <span class="inline-block ml-2">Done</span>
      </button>

      <button
        v-if="attachment_file"
        @click.prevent="submitAssignmentResult"
        type="submit"
        class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 mt-3 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
      >
        <svg
          class="animate-spin -ml-1 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          v-if="form.isSubmitClicked"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <svg
          v-else-if="!form.isSubmitClicked"
          class="fill-current w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"
          />
        </svg>
        <span class="inline-block ml-2">Submit</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import useAssignments from "../modules/assignments";
import useAuth from "../modules/auth";

export default {
  async setup() {
    const route = useRoute();
    const { show } = useAssignments();
    const attachment_file = ref(null);
    const assignment = ref(null);
    const form = reactive({ isSubmitClicked: false });

    const data = new FormData();

    const user = ref(null);
    const { authUser } = useAuth();

    assignment.value = await show(
      route.params.classroomId,
      route.params.assignmentId
    );

    user.value = await authUser();

    function handleFileChange(e) {
      attachment_file.value = e.target.files[0];
    }

    function checkIfUserHasUploadFile(data) {
      const index = data.assignment_results.findIndex(
        (assignment_result) => assignment_result.user.id === user.value.id
      );

      if (index >= 0 && user.value.role.name == "Student") {
        return false;
      } else if (user.value.role.name == "Teacher") {
        return false;
      } else {
        return true;
      }
    }

    function checkIfUserDoneUploadedFile(data) {
      const index = data.assignment_results.findIndex(
        (assignment_result) => assignment_result.user.id === user.value.id
      );
      if (index >= 0 && user.value.role.name == "Student") {
        return true;
      } else if (user.value.role.name == "Teacher") {
        return false;
      } else {
        return false;
      }
    }

    async function submitAssignmentResult() {
      form.isSubmitClicked = true;

      data.append("assignment_id", route.params.assignmentId);
      data.append("attachment_file", attachment_file.value);

      try {
        await axios.post(
          `/assignments/${route.params.assignmentId}/assignment-results`,
          data,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      } catch (e) {
        console.log(e.response.data);
      }

      form.isSubmitClicked = false;
      attachment_file.value = null;
    }

    return {
      attachment_file,
      handleFileChange,
      submitAssignmentResult,
      form,
      assignment,
      checkIfUserHasUploadFile,
      checkIfUserDoneUploadedFile,
    };
  },
};
</script>

<style>
</style>