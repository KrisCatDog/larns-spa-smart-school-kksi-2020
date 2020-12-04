<template>
  <ClassroomNav />

  <Suspense>
    <template #default>
      <ClassroomHeader
        svgPath="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
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
      <Suspense>
        <template #default>
          <SideClassroomProfile />
        </template>

        <template #fallback>
          <div
            class="h-28 col-span-6 md:col-span-2 border bg-white shadow-sm rounded-md p-6 w-full mx-auto"
          >
            <div class="animate-pulse">
              <div class="h-3 bg-red-400 rounded w-1/2"></div>
              <div class="flex space-x-4 mt-3">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-3 py-1">
                  <div class="h-3 bg-red-400 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-3 bg-red-400 rounded w-5/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Suspense>

      <Suspense>
        <template #default>
          <StudentLearningVideoDetail />
        </template>

        <template #fallback>
          <div
            class="col-span-6 border bg-white shadow-sm rounded-md p-6 w-full mx-auto"
          >
            <div class="animate-pulse">
              <div class="h-96 bg-red-300 rounded w-full"></div>

              <div class="flex space-x-4 mt-6">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-4 bg-red-400 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-red-400 rounded w-5/12"></div>
                  </div>
                </div>
              </div>
              <div class="h-4 bg-red-400 rounded w-1/2 mt-5"></div>
            </div>
          </div>
        </template>
      </Suspense>
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import ClassroomNav from "./../components/ClassroomNav";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const SideClassroomProfile = defineAsyncComponent(() =>
  import("./../components/SideClassroomProfile")
);

const StudentLearningVideoDetail = defineAsyncComponent(() =>
  import("./../components/StudentLearningVideoDetail")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    SideClassroomProfile,
    StudentLearningVideoDetail,
  },
  setup() {
    const title = ref(null);
    const description = ref(null);
    const isSubmitClicked = ref(false);

    return {
      title,
      description,

      isSubmitClicked,
    };
  },
};
</script>

<style>
</style>