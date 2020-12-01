<template>
  <ClassroomNav />

  <Suspense>
    <template #default>
      <ClassroomHeader
        svgPath="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
    /></template>

    <template #fallback>
      <div
        class="h-14 px-16 py-4 border bg-white shadow-sm rounded-md w-full mx-auto"
      >
        <div class="animate-pulse">
          <div class="h-4 bg-red-400 rounded w-5/12"></div>
        </div>
      </div>
    </template>
  </Suspense>

  <div class="flex justify-center mt-5">
    <section
      class="w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl md:space-x-6 flex flex-wrap-reverse md:flex-wrap justify-between px-4 sm:px-16 md:px-0 mb-16"
    >
      <Suspense>
        <template #default>
          <StudentAssignmentDetail />
        </template>

        <template #fallback>
          <div
            class="border bg-white shadow-sm rounded-md px-8 py-6 w-full md:flex-1 mx-auto self-start"
          >
            <div class="animate-pulse">
              <div class="flex space-x-4 items-center">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-3 py-1">
                  <div class="h-4 bg-red-400 rounded w-2/12"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-red-400 rounded w-3/12"></div>
                  </div>
                </div>
              </div>
              <div class="h-4 bg-red-400 rounded w-full mt-5"></div>
              <div class="h-4 bg-red-400 rounded w-full mt-3"></div>
            </div>
          </div>
        </template>
      </Suspense>

      <div
        class="w-full md:w-3/12 pb-6 flex flex-col bg-white rounded-md shadow-sm self-start"
      >
        <p
          class="text-center uppercase text-white font-bold bg-red-400 px-2 py-3 rounded-tl-md rounded-tr-md"
        >
          Upload assignment
        </p>

        <div class="flex flex-col items-center justify-evenly mt-4">
          <p>Nama file</p>
          <button
            type="submit"
            class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 mt-5 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
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
                d="M10 18v-10h-2.51l4.51-5.01 4.51 5.01h-2.51v10h-4zm-2 2h8v-10h5l-9-10-9 10h5v10zm11-1v3h-14v-3h-2v5h18v-5h-2z"
              />
            </svg>
            <span class="inline-block ml-2">Upload</span>
          </button>

          <button
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
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent, reactive } from "vue";
import ClassroomNav from "./../components/ClassroomNav";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const StudentAssignmentDetail = defineAsyncComponent(() =>
  import("./../components/StudentAssignmentDetail")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    StudentAssignmentDetail,
  },
  setup() {
    const form = reactive({ isFormClicked: false });

    return {
      form,
    };
  },
};
</script>

<style>
</style>