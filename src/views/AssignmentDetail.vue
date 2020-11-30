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
      class="w-full md:max-w-6xl grid grid-cols-1 md:grid-cols-8 gap-4 sm:gap-8 px-4 sm:px-16 md:px-0 mb-16"
    >
      <div class="col-span-6 bg-white rounded-lg shadow-sm">
        <div class="px-8 py-6 flex items-center justify-between">
          <div class="w-1/2 sm:w-1/3 pr-10 flex items-center">
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
                {{ assignment.title }}
              </h3>
              <p class="mt-1 text-sm">Posted at</p>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            venenatis ut arcu blandit varius. Duis nec viverra elit.
            Pellentesque pharetra aliquam nisi eu bibendum. Nam rutrum varius
            libero, sed congue purus ornare id. Duis enim nibh, interdum nec
            eros elementum, lobortis fringilla mauris.
          </p>
        </div>
      </div>

      <div
        class="h-52 col-span-6 md:col-span-2 flex flex-col bg-white rounded-md shadow-sm"
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
            class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 mt-2 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
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
import { defineAsyncComponent, reactive, ref } from "vue";
import ClassroomNav from "./../components/ClassroomNav";
import { useRoute } from "vue-router";
import useAssignments from "./../modules/assignments";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
  },
  async setup() {
    const route = useRoute();
    const form = reactive({ isFormClicked: false });
    const assignment = ref(null);
    const { show } = useAssignments();

    assignment.value = await show(
      route.params.classroomId,
      route.params.assignmentId
    );

    return {
      form,
      assignment,
    };
  },
};
</script>

<style>
</style>