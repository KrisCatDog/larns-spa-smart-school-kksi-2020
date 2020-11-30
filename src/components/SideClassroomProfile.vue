<template>
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
        <h3 class="font-semibold">{{ user.name }}</h3>
        <p class="text-sm">{{ user.role.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useAuth from "../modules/auth";
export default {
  name: "SideClassroomProfile",
  async setup() {
    const user = ref(null);
    const { authUser } = useAuth();

    user.value = await authUser();

    return {
      user,
    };
  },
};
</script>