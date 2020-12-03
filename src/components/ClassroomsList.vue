<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-0"
  >
    <div
      v-for="classroom in classrooms"
      @click="
        $router.push({
          name: 'Attendances',
          params: { classroomId: classroom.uuid },
        })
      "
      :key="classroom.id"
      class="flex h-36 rounded-xl bg-white shadow-sm transition duration-100 ease-in transform hover:translate-y-1 cursor-pointer hover:bg-red-50"
    >
      <div
        class="h-full w-1/3 bg-gray-500 rounded-tl-xl rounded-bl-xl"
        style="
          background-image: url('https://placekitten.com/200/204');
          background-size: cover;
        "
      ></div>

      <div class="flex flex-col justify-between py-4 px-5 w-1/2">
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

      <div class="self-start relative w-1/6">
        <button
          v-if="user && user.role.name == 'Teacher'"
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
          class="absolute top-10 right-0 w-32 bg-white shadow-md border rounded-md py-1 z-50"
        >
          <button
            @click="submitLogout"
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Edit</div>
          </button>

          <button
            @click="submitLogout"
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Delete</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useClassrooms from "./../modules/classrooms";
import useAuth from "../modules/auth";

export default {
  name: "ClassroomsList",
  async setup() {
    const { authUser } = useAuth();
    const { load, classrooms } = useClassrooms();

    const user = ref(null);

    onMounted(async () => {
      user.value = await authUser();
    });

    await load();

    function showSettingModal(classroom) {
      event.stopPropagation();

      classroom.isSettingModalActive = !classroom.isSettingModalActive;
    }

    return {
      classrooms,
      showSettingModal,
      user,
    };
  },
};
</script>
