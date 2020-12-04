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

              <span class="font-medium text-sm">Post a Video!</span>
            </button>
          </transition>

          <transition
            enter-active-class="animate__animated animate__fadeInDown"
          >
            <form
              v-if="isStoreViewShowed"
              @submit.prevent="submitStoreVideo"
              class="w-full flex flex-col"
              enctype="multipart/form-data"
            >
              <input
                v-model="title"
                class="appearance-none bg-gray-100 mb-4 px-4 py-2 font-semibold rounded-md focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:outline-none"
                type="text"
                placeholder="Video title.."
              />

              <textarea
                v-model="description"
                class="appearance-none h-28 bg-gray-100 text-sm font-medium mb-4 px-4 py-2 rounded-md resize-y focus:ring focus:ring-red-400 focus:ring-opacity-50 focus:outline-none"
                placeholder="Video description.."
              ></textarea>

              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-3">
                  <div
                    class="flex items-center border bg-indigo-500 border-indigo-500 text-white px-4 py-1 mt-1 rounded-full transition duration-100 ease-in-out transform hover:bg-indigo-600 hover:border-indigo-600 focus:translate-y-1 hover:text-white focus:outline-none"
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

                    <span>Attach Video!</span>
                  </div>

                  <p v-if="attachmentVideo" class="font-medium truncate">
                    {{ attachmentVideo.name }}
                  </p>

                  <input
                    type="file"
                    @change="handleFileChange"
                    class="hidden"
                  />
                </label>

                <div class="flex items-center space-x-3">
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

                    <span class="inline-block ml-2">Cancel</span>
                  </button>

                  <button
                    type="submit"
                    class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
                  >
                    <CircleLoading v-if="isSubmitClicked" />

                    <svg
                      v-if="!isSubmitClicked"
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
                      />
                    </svg>
                    <span>Post!</span>
                  </button>
                </div>
              </div>
            </form>
          </transition>
        </div>

        <Suspense>
          <template #default>
            <LearningVideosList />
          </template>

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
                  Video successfully uploaded!
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
import { defineAsyncComponent, onMounted, ref } from "vue";
import ClassroomNav from "./../components/ClassroomNav";
import useClassVideos from "./../modules/class-videos";
import { useRoute } from "vue-router";
import CircleLoading from "../components/CircleLoading.vue";
import useAuth from "../modules/auth";

const ClassroomHeader = defineAsyncComponent(() =>
  import("./../components/ClassroomHeader")
);

const LearningVideosList = defineAsyncComponent(() =>
  import("./../components/LearningVideosList")
);

const SideClassroomProfile = defineAsyncComponent(() =>
  import("./../components/SideClassroomProfile")
);

export default {
  components: {
    ClassroomNav,
    ClassroomHeader,
    LearningVideosList,
    SideClassroomProfile,
    CircleLoading,
  },
  setup() {
    const route = useRoute();
    const isStoreViewShowed = ref(false);
    const isSuccessModalShowed = ref(false);
    const attachmentVideo = ref(null);
    const title = ref(null);
    const description = ref(null);
    const isSubmitClicked = ref(false);

    const { store } = useClassVideos();

    const user = ref(null);
    const { authUser } = useAuth();

    onMounted(async () => {
      user.value = await authUser();
    });

    const data = new FormData();

    function handleFileChange(event) {
      attachmentVideo.value = event.target.files[0];
    }

    async function submitStoreVideo() {
      isSubmitClicked.value = true;

      data.append("attachment_video", attachmentVideo.value);
      data.append("title", title.value);
      data.append("description", description.value);

      await store(route.params.classroomId, data);

      isSubmitClicked.value = false;

      showModal();
    }

    function showModal() {
      isSuccessModalShowed.value = true;

      setTimeout(function () {
        isSuccessModalShowed.value = false;
      }, 2000);
    }

    return {
      handleFileChange,
      submitStoreVideo,
      title,
      description,
      attachmentVideo,
      isSubmitClicked,
      isStoreViewShowed,
      user,
      isSuccessModalShowed,
    };
  },
};
</script>

<style>
</style>