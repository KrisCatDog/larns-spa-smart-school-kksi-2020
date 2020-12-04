<template>
  <ClassroomNav />

  <Suspense>
    <template #default>
      <ClassroomHeader
        svgPath="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"
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

      <div class="col-span-6">
        <div
          v-if="user && user.role.name == 'Teacher'"
          class="bg-white rounded-md shadow-sm px-8 py-5 mb-5 flex flex-col overflow-hidden"
        >
          <transition
            enter-active-class="animate__animated animate__fadeInDown"
          >
            <button
              v-if="!isStoreViewShowed"
              @click.prevent="isStoreViewShowed = !isStoreViewShowed"
              class="flex items-center space-x-3 bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded focus:outline-none"
            >
              <svg
                class="fill-current w-4 h-4 stroke-current stroke-1 text-gray-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
              </svg>

              <span class="font-medium text-sm">Create Attendance</span>
            </button>
          </transition>

          <transition
            enter-active-class="animate__animated animate__fadeInDown"
          >
            <form
              v-if="isStoreViewShowed"
              @submit.prevent="submitStoreAttendance"
              class="bg-white rounded-md px-6 py-1 flex flex-col md:flex-row md:items-center justify-between"
            >
              <div
                class="flex items-center justify-around sm:justify-between -ml-5"
              >
                <div
                  class="ml-5 flex flex-col items-center sm:flex-row space-y-2 sm:space-y-0"
                >
                  <span class="font-semibold">From</span>
                  <input
                    v-model="form.started_at"
                    type="time"
                    class="appearance-none border border-gray-600 px-4 py-1 rounded-md ml-3 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:border-gray-100"
                  />
                </div>

                <div
                  class="ml-5 flex flex-col items-center sm:flex-row space-y-2 sm:space-y-0"
                >
                  <span class="font-semibold">Until</span>
                  <input
                    v-model="form.ended_at"
                    type="time"
                    class="appearance-none border border-gray-600 px-4 py-1 rounded-md ml-3 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:border-gray-100"
                  />
                </div>
              </div>

              <div class="flex self-end items-center mt-8 md:mt-0 space-x-3">
                <button
                  @click.prevent="isStoreViewShowed = !isStoreViewShowed"
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

                  <span class="inline-block ml-2 text-sm md:text-base"
                    >Cancel</span
                  >
                </button>

                <button
                  type="submit"
                  class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
                >
                  <CircleLoading v-if="form.isSubmitClicked" />

                  <svg
                    class="fill-current w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    v-if="!form.isSubmitClicked"
                  >
                    <path
                      d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
                    />
                  </svg>

                  <span class="inline-block ml-2 text-sm md:text-base"
                    >Post!</span
                  >
                </button>
              </div>
            </form>
          </transition>
        </div>

        <Suspense>
          <template #default> <AttendancesList /></template>

          <template #fallback>
            <div
              v-for="index in 6"
              :key="index"
              class="border bg-white shadow-sm rounded-md py-5 px-8 mb-4 w-full mx-auto"
            >
              <div class="animate-pulse">
                <div class="flex items-center space-x-4">
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

  <transition
    id="dark-bg"
    enter-active-class="animate__animated animate__fadeIn animate__faster"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
  >
    <div
      class="fixed inset-0 transition-opacity"
      aria-hidden="true"
      v-if="isSuccessModalShowed"
    >
      <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
    </div>
  </transition>

  <transition
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isSuccessModalShowed">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-1/3"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-gray-50 py-5">
            <img
              src="./../assets/logo.svg"
              alt="larns logo"
              class="w-24 px-6"
            />
          </div>

          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="fill-current h-5 w-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"
                  />
                </svg>
              </div>
              <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Attendance successfully posted!
                </h3>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click.prevent="isSuccessModalShowed = !isSuccessModalShowed"
              type="submit"
              class="w-full inline-flex justify-center items-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Okay!
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineAsyncComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import ClassroomNav from "./../components/ClassroomNav";
import CircleLoading from "./../components/CircleLoading";
import useAttendances from "../modules/attendances";
import useAuth from "../modules/auth";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const AttendancesList = defineAsyncComponent(() =>
  import("./../components/AttendancesList")
);

const SideClassroomProfile = defineAsyncComponent(() =>
  import("./../components/SideClassroomProfile")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    AttendancesList,
    SideClassroomProfile,
    CircleLoading,
  },
  setup() {
    const form = reactive({
      started_at: null,
      ended_at: null,
      isSubmitClicked: false,
    });
    const isStoreViewShowed = ref(false);
    const isSuccessModalShowed = ref(false);
    const route = useRoute();
    const { store } = useAttendances();

    const user = ref(null);
    const { authUser } = useAuth();

    onMounted(async () => {
      user.value = await authUser();
    });

    async function submitStoreAttendance() {
      form.isSubmitClicked = true;

      await store(route.params.classroomId, form);

      form.isSubmitClicked = false;

      resetForm();

      showModal();
    }

    function showModal() {
      isSuccessModalShowed.value = true;

      setTimeout(function () {
        isSuccessModalShowed.value = false;
      }, 2000);
    }

    function resetForm() {
      form.started_at = null;
      form.ended_at = null;
    }

    return {
      form,
      resetForm,
      submitStoreAttendance,
      isStoreViewShowed,
      user,
      isSuccessModalShowed,
      showModal,
    };
  },
};
</script>

<style>
</style>