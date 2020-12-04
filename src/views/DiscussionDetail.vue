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
          <StudentQuestionDetail />
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
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent, reactive } from "vue";
import ClassroomNav from "./../components/ClassroomNav";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const StudentQuestionDetail = defineAsyncComponent(() =>
  import("./../components/StudentQuestionDetail")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    StudentQuestionDetail,
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