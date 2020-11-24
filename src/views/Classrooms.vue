<template>
  <Nav />

  <header
    class="bg-white flex justify-between items-center px-8 sm:px-16 py-4 border-b"
  >
    <h1 class="text-black-300 font-semibold flex items-center">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M10 23c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.884.586 1.414v1h-6v-1zm8 0c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.884.586 1.414v1h-6v-1zm-11.241-14c.649 0 1.293-.213 1.692-.436.755-.42 2.695-1.643 3.485-2.124.216-.131.495-.083.654.113l.008.011c.165.204.146.499-.043.68-.622.597-2.443 2.328-3.37 3.213-.522.499-.822 1.183-.853 1.904-.095 2.207-.261 6.912-.331 8.833-.017.45-.387.806-.837.806h-.001c-.444 0-.786-.347-.836-.788-.111-.981-.329-3.28-.426-4.212-.04-.384-.28-.613-.585-.615-.304-.001-.523.226-.549.609-.061.921-.265 3.248-.341 4.22-.034.442-.397.786-.84.786h-.001c-.452 0-.824-.357-.842-.808-.097-2.342-.369-8.964-.369-8.964l-1.287 2.33c-.14.253-.445.364-.715.26h-.001c-.279-.108-.43-.411-.349-.698l1.244-4.393c.122-.43.515-.727.962-.727h4.531zm6.241 7c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm8 0c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm3-1h-14v-2h7v-1h3v1h2v-11h-20v4.356l-2 2v-8.356h24v15zm-7-5h-3v-1h3v1zm-11.626-6c1.241 0 2.25 1.008 2.25 2.25s-1.009 2.25-2.25 2.25c-1.242 0-2.25-1.008-2.25-2.25s1.008-2.25 2.25-2.25zm14.626 4h-6v-1h6v1zm0-2h-6v-1h6v1z"
        />
      </svg>

      <span class="inline-block pb-1 ml-2">Classrooms</span>
    </h1>

    <button
      @click.prevent="isJoinClassModalActive = !isJoinClassModalActive"
      class="flex items-center border border-gray-800 px-5 py-1 rounded-full transition duration-100 ease-in-out hover:bg-red-400 hover:border-red-400 hover:text-white focus:outline-none"
    >
      <svg
        class="fill-current w-4 h-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
      </svg>

      <span class="inline-block ml-2">Join</span>
    </button>
  </header>

  <section class="px-8 sm:px-16 py-6">
    <Suspense>
      <template #default>
        <ClassroomsList />
      </template>

      <template #fallback>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            class="mt-2 border bg-white shadow-sm rounded-md p-6 w-full mx-auto"
          >
            <div class="animate-pulse">
              <div class="h-4 bg-red-400 rounded w-5/12"></div>

              <div class="flex space-x-4 mt-3">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-red-400 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-red-400 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-2 border bg-white shadow-sm rounded-md p-6 w-full mx-auto"
          >
            <div class="animate-pulse">
              <div class="h-4 bg-red-400 rounded w-5/12"></div>

              <div class="flex space-x-4 mt-3">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-red-400 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-red-400 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-2 border bg-white shadow-sm rounded-md p-6 w-full mx-auto"
          >
            <div class="animate-pulse">
              <div class="h-4 bg-red-400 rounded w-5/12"></div>

              <div class="flex space-x-4 mt-3">
                <div class="rounded-full bg-red-400 h-10 w-10"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-red-400 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-red-400 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </section>

  <div
    v-if="isJoinClassModalActive"
    class="fixed rounded-xl w-80 bg-white flex flex-col z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <img src="./../assets/logo.svg" alt="larns logo" class="w-24 px-6 pt-6" />

    <h2 class="text-2xl font-bold px-6 pt-6">Join a Classroom</h2>

    <form class="mt-6 px-6 pb-3">
      <div class="flex flex-col mb-6">
        <label for="email" class="text-xs font-bold tracking-wide uppercase">
          Class code
        </label>
        <input
          type="text"
          id="email"
          class="appearance-none w-full bg-transparent border-b border-gray-700 px-1 py-2 focus:border-red-400 focus:outline-none"
        />
      </div>
    </form>

    <div
      class="px-6 py-4 bg-red-300 rounded-bl-xl rounded-br-xl flex justify-end space-x-2"
    >
      <button
        @click="isJoinClassModalActive = false"
        class="inline-flex items-center self-end bg-red-300 hover:bg-red-400 text-white py-2 px-6 transition duration-100 ease-in border border-red-300 hover:border-red-400 rounded-full focus:outline-none"
      >
        <span class="text-sm font-bold">Cancel</span>
      </button>

      <button
        class="inline-flex items-center self-end bg-red-400 hover:bg-red-500 text-white py-2 px-6 transition duration-100 ease-in border border-red-400 hover:border-red-500 rounded-full focus:outline-none"
      >
        <span class="text-sm font-bold">Join</span>
      </button>
    </div>
  </div>

  <div
    @click="isJoinClassModalActive = false"
    class="inset-0 fixed bg-black opacity-25"
    v-if="isJoinClassModalActive"
  ></div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Nav from "./../components/Nav";

const ClassroomsList = defineAsyncComponent(() =>
  import("./../components/ClassroomsList")
);

export default {
  components: {
    Nav,
    ClassroomsList,
  },
  data() {
    return {
      isJoinClassModalActive: false,
    };
  },
};
</script>

<style>
</style>