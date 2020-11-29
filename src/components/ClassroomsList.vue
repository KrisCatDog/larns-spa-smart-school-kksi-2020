<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-0"
  >
    <div
      v-for="classroom in classrooms"
      @click="
        $router.push({ name: 'Attendances', params: { id: classroom.id } })
      "
      :key="classroom.id"
      class="flex h-36 rounded-xl bg-white shadow-sm transition duration-100 ease-in transform hover:translate-y-1 cursor-pointer hover:bg-red-50"
    >
      <div
        class="h-full w-32 bg-gray-500 rounded-tl-xl rounded-bl-xl"
        style="
          background-image: url('https://placekitten.com/200/204');
          background-size: cover;
        "
      ></div>

      <div class="flex flex-col justify-between py-4 px-5 w-56">
        <div>
          <h2 class="text-lg font-bold">{{ classroom.name }}</h2>
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
          <span class="inline-block ml-2">Kris</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useClassrooms from "./../modules/classrooms";

export default {
  name: "ClassroomsList",
  async setup() {
    const { load, classrooms } = useClassrooms();

    await load();

    return {
      classrooms,
    };
  },
};
</script>
