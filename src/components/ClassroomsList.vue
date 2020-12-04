<template>
  <EmptyAlert
    message="There's no classroom here!"
    :messageBold="boldAlertMessage(user.role.name)"
    v-if="!classrooms[0] && user"
  />

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-0"
  >
    <div
      v-for="classroom in classrooms"
      :key="classroom.id"
      class="flex h-36 rounded-xl bg-white shadow-sm transition duration-100 ease-in hover:bg-red-50"
    >
      <div
        class="h-full w-1/3 bg-gray-500 rounded-tl-xl rounded-bl-xl"
        style="
          background-image: url(`https://picsum.photos/200`);
          background-size: cover;
        "
      ></div>

      <div
        @click="
          $router.push({
            name: 'Attendances',
            params: { classroomId: classroom.uuid },
          })
        "
        class="flex flex-col justify-between py-4 px-5 w-1/2 cursor-pointer"
      >
        <div>
          <h2 class="text-lg font-bold truncate">{{ classroom.name }}</h2>
          <h4 class="text-sm font-medium mt-2">
            {{ classroom.grade + " " + classroom.major }}
          </h4>
        </div>

        <div class="flex items-center">
          <div class="w-9 h-9 bg-gray-200 rounded-full">
            <img
              src="https://placekitten.com/200/201"
              alt=""
              class="w-full h-full rounded-full"
            />
          </div>
          <span class="inline-block ml-2">{{ classroom.user.name }}</span>
        </div>
      </div>

      <div class="self-start w-1/6 relative">
        <button
          @click="showSettingModal(classroom)"
          class="p-5 focus:outline-none rounded"
        >
          <svg
            class="fill-current w-4 h-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
            />
          </svg>
        </button>

        <div
          v-if="classroom.isSettingModalActive"
          class="absolute top-10 right-0 w-36 bg-white shadow-md border rounded-md py-1 z-10"
        >
          <button
            v-if="user && user.role.name == 'Teacher'"
            @click.prevent="toggleEditModal(classroom)"
            class="w-full space-x-3 text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
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

            <div class="inline-block text-sm">Edit</div>
          </button>

          <button
            v-if="user && user.role.name == 'Teacher'"
            @click.prevent="toggleDeleteModal(classroom)"
            class="w-full space-x-3 text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
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

            <div class="inline-block text-sm">Delete</div>
          </button>

          <button
            v-if="user && user.role.name == 'Student'"
            @click.prevent="toggleLeaveClassModal(classroom)"
            class="w-full space-x-3 text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
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

            <div class="inline-block text-sm">Leave Class</div>
          </button>
        </div>
      </div>

      <transition
        id="dark-bg"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <div
          @click.prevent="
            classroom.isDeleteModalActive = false;
            classroom.isSettingModalActive = false;
            classroom.isEditModalActive = false;
          "
          v-if="
            classroom.isDeleteModalActive ||
            classroom.isSettingModalActive ||
            classroom.isEditModalActive ||
            classroom.isLeaveClassModalActive
          "
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>
      </transition>

      <transition
        id="leave-class-modal"
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div
          class="fixed z-30 inset-0 overflow-y-auto"
          v-if="classroom.isLeaveClassModalActive"
        >
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >

            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <svg
                      class="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {{ classroom.name }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to leave this class?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  @click.prevent="submitLeaveClassroom(classroom.uuid)"
                  type="submit"
                  class="w-full inline-flex justify-center items-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <CircleLoading v-if="isLeaveClassButtonClicked" />

                  Leave
                </button>

                <button
                  @click="
                    classroom.isLeaveClassModalActive = !classroom.isLeaveClassModalActive
                  "
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-red-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition
        id="delete-modal"
        enter-active-class="animate__animated animate__zoomInDown"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div
          class="fixed z-30 inset-0 overflow-y-auto"
          v-if="classroom.isDeleteModalActive"
        >
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >

            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <svg
                      class="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      {{ classroom.name }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  @click="submitDestroyClassroom(classroom.uuid)"
                  type="submit"
                  class="w-full inline-flex justify-center items-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <CircleLoading v-if="isDeleteButtonClicked" />

                  Delete
                </button>

                <button
                  @click="
                    classroom.isDeleteModalActive = !classroom.isDeleteModalActive
                  "
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-red-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition id="edit-modal" name="modal-create">
        <form
          autocomplete="off"
          @submit.prevent="submitEditClassroom(classroom)"
          v-if="classroom.isEditModalActive"
          class="fixed rounded-xl w-80 bg-white flex flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div class="bg-gray-50 py-6 rounded-tl-xl rounded-tr-xl">
            <img
              src="./../assets/logo.svg"
              alt="larns logo"
              class="w-24 px-6"
            />
          </div>

          <h2 class="text-2xl font-bold px-6 mt-2">Edit a Classroom</h2>

          <div class="mt-6 px-6 pb-3">
            <div class="flex flex-col mb-6">
              <label
                for="name"
                class="text-xs font-bold tracking-wide uppercase"
              >
                Name
              </label>
              <input
                v-model="classroom.name"
                type="text"
                id="name"
                class="appearance-none w-full bg-transparent border-b border-gray-700 px-1 py-2 focus:border-red-400 focus:outline-none"
              />
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="grade"
                class="text-xs font-bold tracking-wide uppercase"
              >
                Grade
              </label>
              <input
                v-model="classroom.grade"
                type="text"
                id="grade"
                class="appearance-none w-full bg-transparent border-b border-gray-700 px-1 py-2 focus:border-red-400 focus:outline-none"
              />
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="major"
                class="text-xs font-bold tracking-wide uppercase"
              >
                Major
              </label>
              <input
                v-model="classroom.major"
                type="text"
                id="major"
                class="appearance-none w-full bg-transparent border-b border-gray-700 px-1 py-2 focus:border-red-400 focus:outline-none"
              />
            </div>
          </div>

          <div
            class="px-6 py-4 bg-gray-50 rounded-bl-xl rounded-br-xl flex justify-end space-x-2"
          >
            <button
              @click.prevent="classroom.isEditModalActive = false"
              class="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-red-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <span class="text-sm font-bold">Cancel</span>
            </button>

            <button
              type="submit"
              class="inline-flex items-center self-end bg-red-400 hover:bg-red-500 text-white py-2 px-6 transition duration-100 ease-in border border-red-400 hover:border-red-500 rounded-full focus:outline-none"
            >
              <CircleLoading v-if="isEditButtonClicked" />

              <span class="text-sm font-bold">Edit</span>
            </button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useClassrooms from "./../modules/classrooms";
import useAuth from "../modules/auth";
import EmptyAlert from "./EmptyAlert.vue";
import CircleLoading from "./CircleLoading.vue";

export default {
  components: { EmptyAlert, CircleLoading },
  name: "ClassroomsList",
  async setup() {
    const { authUser } = useAuth();
    const { load, classrooms, destroy, update, leaveClass } = useClassrooms();

    const user = ref(null);
    const isEditButtonClicked = ref(false);
    const isDeleteButtonClicked = ref(false);
    const isLeaveClassButtonClicked = ref(false);

    onMounted(async () => {
      user.value = await authUser();
    });

    await load();

    async function submitDestroyClassroom(id) {
      event.stopPropagation();

      isDeleteButtonClicked.value = true;

      await destroy(id);

      isDeleteButtonClicked.value = false;
    }

    async function submitEditClassroom(classroom) {
      event.stopPropagation();

      isEditButtonClicked.value = true;

      await update(classroom.uuid, classroom);

      isEditButtonClicked.value = false;
    }

    async function submitLeaveClassroom(uuid) {
      event.stopPropagation();

      isLeaveClassButtonClicked.value = true;

      await leaveClass(uuid);

      isLeaveClassButtonClicked.value = false;
    }

    function boldAlertMessage(roleName) {
      if (roleName == "Teacher") {
        return "Go create one!";
      } else {
        return "Join a class!";
      }
    }

    function showSettingModal(classroom) {
      event.stopPropagation();

      classroom.isSettingModalActive = !classroom.isSettingModalActive;
    }

    function toggleDeleteModal(classroom) {
      event.stopPropagation();

      classroom.isDeleteModalActive = !classroom.isDeleteModalActive;
      classroom.isSettingModalActive = !classroom.isSettingModalActive;
    }

    function toggleEditModal(classroom) {
      event.stopPropagation();

      classroom.isEditModalActive = !classroom.isEditModalActive;
      classroom.isSettingModalActive = !classroom.isSettingModalActive;
    }

    function toggleLeaveClassModal(classroom) {
      event.stopPropagation();

      classroom.isSettingModalActive = !classroom.isSettingModalActive;
      classroom.isLeaveClassModalActive = !classroom.isLeaveClassModalActive;
    }

    return {
      classrooms,
      showSettingModal,
      user,
      submitDestroyClassroom,
      boldAlertMessage,
      toggleDeleteModal,
      toggleEditModal,
      isEditButtonClicked,
      submitEditClassroom,
      isDeleteButtonClicked,
      toggleLeaveClassModal,
      submitLeaveClassroom,
      isLeaveClassButtonClicked,
    };
  },
};
</script>
