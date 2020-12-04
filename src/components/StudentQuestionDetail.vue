<template>
  <div
    class="w-full md:flex-1 mt-5 md:mt-0 bg-white rounded-lg shadow-sm self-start"
  >
    <div class="px-8 py-6 flex items-center justify-between">
      <div class="flex items-center">
        <div class="p-2 rounded-full bg-gradient-to-br from-red-500 to-red-300">
          <svg
            class="fill-current w-5 h-5 text-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-3v-1h3v1zm0 2h-3v1h3v-1zm0 3h-10v1h10v-1zm-5-6h-5v4h5v-4z"
            />
          </svg>
        </div>

        <div class="ml-5 flex flex-col w-full">
          <h3 class="truncate font-semibold text-lg">
            {{ question.title }}
          </h3>
          <p class="mt-1 text-sm">Posted at {{ question.created_at }}</p>
        </div>
      </div>

      <div class="flex space-x-6">
        <button
          @click="$router.go(-1)"
          class="flex items-center border border-gray-800 px-4 py-1 text-sm rounded-full transition duration-100 ease-in-out hover:bg-red-400 hover:border-red-400 hover:text-white focus:outline-none"
        >
          <svg
            class="fill-current w-4 h-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
            />
          </svg>
          <span class="inline-block ml-2">Back</span>
        </button>
      </div>
    </div>

    <hr />

    <div class="px-8 pt-4 pb-6">
      <p class="text-sm font-medium">
        {{ question.description }}
      </p>
    </div>

    <hr />

    <div class="px-5 pt-4 pb-2 flex space-x-2">
      <input
        v-model="form.answer"
        placeholder="Answer this question"
        type="text"
        class="appearance-none w-full border rounded-full focus:outline-none px-5 py-2 font-medium"
      />

      <button
        @click.prevent="submitStoreAnswer"
        class="flex items-center border bg-red-500 border-red-500 text-white px-4 py-1 rounded-full transition duration-100 ease-in-out transform hover:bg-red-600 hover:border-red-600 focus:translate-y-1 hover:text-white focus:outline-none"
      >
        <CircleLoading v-if="form.isSubmitClicked" />

        <svg
          v-if="!form.isSubmitClicked"
          class="fill-current w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
          />
        </svg>
        <span class="inline-block ml-2">Post!</span>
      </button>
    </div>

    <div class="pt-3">
      <div
        class="flex flex-col space-y-3 border-t py-4 px-6"
        :key="questionAnswer.id"
        v-for="questionAnswer in question.question_answers"
      >
        <div class="flex items-center space-x-4">
          <img
            class="h-10 w-10 rounded-full"
            src="https://picsum.photos/200"
            alt=""
          />
          <h5 class="text-sm font-bold">
            {{ questionAnswer.user.name }} answered
          </h5>
        </div>
        <p class="font-medium">
          {{ questionAnswer.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import useQuestions from "../modules/questions";
import CircleLoading from "./CircleLoading.vue";
import axios from "axios";

export default {
  name: "StudentAnnouncementDetail",
  components: {
    CircleLoading,
  },
  async setup() {
    const route = useRoute();
    const question = ref(null);
    const form = reactive({ answer: null, isSubmitClicked: false });
    const { show, storeAnswer, load } = useQuestions();

    await load(route.params.classroomId);

    question.value = await show(
      route.params.classroomId,
      route.params.questionId
    );

    async function submitStoreAnswer() {
      form.isSubmitClicked = true;

      await storeAnswer(route.params.questionId, form);

      form.isSubmitClicked = false;

      const response = await axios.post(
        `/questions/${route.params.questionId}/question-answers`,
        form,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      question.value.question_answers.unshift(response.data.data);

      form.answer = null;
    }

    return {
      question,
      form,
      submitStoreAnswer,
    };
  },
};
</script>