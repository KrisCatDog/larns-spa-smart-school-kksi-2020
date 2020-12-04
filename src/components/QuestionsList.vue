<template>
  <div
    v-for="question in questions"
    :key="question.id"
    class="bg-white rounded-md shadow-sm px-8 py-6 mb-3 flex items-center justify-between"
  >
    <div class="w-1/2 sm:w-1/3 pr-10 flex items-center">
      <div class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300">
        <svg
          class="fill-current w-5 h-5 text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-6-6h-9.667l-5.333 4v-4h-3v-14.001h18v14.001zm-9-4.084h-5v1.084h5v-1.084zm5-2.916h-10v1h10v-1zm0-3h-10v1h10v-1z"
          />
        </svg>
      </div>

      <div class="ml-5 flex flex-col w-full">
        <h3 class="truncate font-semibold text-sm">{{ question.title }}</h3>
        <p class="mt-1 text-sm">Posted at {{ question.created_at }}</p>
      </div>
    </div>

    <div class="flex space-x-6">
      <button
        v-if="user.role.name == 'Student'"
        @click="
          $router.push({
            name: 'DiscussionDetail',
            params: {
              classroomId: $route.params.classroomId,
              questionId: question.id,
            },
          })
        "
        class="flex items-center border border-red-500 text-red-500 px-4 py-1 text-sm rounded-full transition duration-100 ease-in-out hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none"
      >
        <svg
          class="fill-current w-4 h-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
          />
        </svg>
        <span class="inline-block ml-2">Detail</span>
      </button>

      <div class="relative" v-if="user.role.name == 'Teacher'">
        <button
          @click.prevent="
            question.isSettingModalActive = !question.isSettingModalActive
          "
          class="ring-red-400 ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-4 rounded"
        >
          <svg
            class="fill-current w-4 h-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
            />
          </svg>
        </button>

        <div
          v-if="question.isSettingModalActive"
          class="absolute top-6 right-0 w-40 bg-white shadow-md border rounded-md py-1 z-50"
        >
          <button
            @click="
              $router.push({
                name: 'AssignmentResults',
                params: {
                  classroomId: $route.params.classroomId,
                  assignmentId: assignment.id,
                },
              })
            "
            class="w-full text-black-300 font-medium px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none"
          >
            <div class="inline-block text-sm">Assignment Data</div>
          </button>

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
import { ref } from "vue";
import { useRoute } from "vue-router";
import useQuestions from "./../modules/questions";
import useAuth from "../modules/auth";

export default {
  name: "QuestionsList",
  async setup() {
    const route = useRoute();
    const { load, questions } = useQuestions();

    const user = ref(null);
    const { authUser } = useAuth();

    user.value = await authUser();

    await load(route.params.classroomId);

    return {
      questions,
      user,
    };
  },
};
</script>

