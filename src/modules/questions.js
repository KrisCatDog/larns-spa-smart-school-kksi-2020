import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  questions: [],
});

export default function useQuestions() {
  const load = async (id) => {
    state.questions = [];

    try {
      const response = await axios.get(`/classrooms/${id}/questions`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;

        state.questions.push(item);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (classroomId, data) => {
    try {
      const response = await axios.post(
        `/classrooms/${classroomId}/questions`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      state.questions.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const show = async (classroomId, id) => {
    try {
      const response = await axios.get(
        `/classrooms/${classroomId}/questions/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      return response.data.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  const update = async (classroomId, id, data) => {
    try {
      const response = await axios.put(
        `/classrooms/${classroomId}/questions/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.questions.findIndex((question) => question.id === id);

      state.questions[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId, id) => {
    try {
      await axios.delete(`/classrooms/${classroomId}/questions/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.questions = state.questions.filter(
        (question) => question.id !== id
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  const storeAnswer = async (questionId, data) => {
    try {
      const response = await axios.post(
        `/questions/${questionId}/question-answers`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.questions.findIndex((question) => {
        if (question.id == questionId) {
          return true;
        }
      });

      state.questions[index].question_answers.push(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store, show, update, destroy, storeAnswer };
}
