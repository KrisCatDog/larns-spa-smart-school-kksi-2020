<template>
  <ClassroomNav />

  <Suspense>
    <template #default>
      <ClassroomHeader
        svgPath="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
    /></template>

    <template #fallback>
      <div
        class="h-14 px-16 py-3 border bg-white shadow-sm rounded-md w-full mx-auto"
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
      <div
        class="h-28 col-span-6 md:col-span-2 flex flex-col justify-around bg-white p-6 rounded-md shadow-sm"
      >
        <p class="text-xs uppercase text-red-500 font-bold">My Profile</p>

        <div class="flex items-center mt-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full">
            <img
              src="https://placekitten.com/200/202"
              alt=""
              class="w-full h-full rounded-full"
            />
          </div>

          <div class="ml-3">
            <h3 class="font-semibold">CatDog</h3>
            <p class="text-sm">Teacher</p>
          </div>
        </div>
      </div>

      <div class="col-span-6">
        <div class="bg-white rounded-md shadow-sm px-8 py-5 mb-5 flex flex-col">
          <input
            class="appearance-none bg-gray-100 mb-4 px-4 py-2 font-semibold rounded-md focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:outline-none"
            type="text"
            placeholder="Assignment title.."
          />

          <textarea
            class="appearance-none h-28 bg-gray-100 text-sm font-medium mb-4 px-4 py-2 rounded-md resize-y focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:outline-none"
            placeholder="Assignment description.."
          ></textarea>

          <div class="flex items-center self-end space-x-3">
            <button
              class="flex items-center border border-gray-800 px-4 py-1 rounded-full transition duration-100 ease-in-out hover:bg-yellow-400 hover:border-yellow-400 hover:text-white focus:outline-none"
            >
              <svg
                class="fill-current w-4 h-4 stroke-current stroke-1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
                />
              </svg>

              <span class="inline-block ml-2">Cancel</span>
            </button>
            <button
              class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
            >
              <svg
                class="fill-current w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
                />
              </svg>
              <span class="inline-block ml-2">Post!</span>
            </button>
          </div>
        </div>

        <Suspense>
          <template #default>
            <AssignmentsList />
          </template>

          <template #fallback>
            <div
              class="border bg-white shadow-sm rounded-md py-5 px-8 w-full mx-auto"
            >
              <div class="animate-pulse">
                <div class="flex space-x-4">
                  <div class="rounded-full bg-red-400 h-10 w-10"></div>
                  <div class="flex-1 space-y-3 py-1">
                    <div class="h-4 bg-red-400 rounded w-4/6"></div>
                    <div class="space-y-2">
                      <div class="h-4 bg-red-400 rounded w-5/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import ClassroomNav from "./../components/ClassroomNav";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const AssignmentsList = defineAsyncComponent(() =>
  import("./../components/AssignmentsList")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    AssignmentsList,
  },
};
</script>

<style>
</style>