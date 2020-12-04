import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  assignmentResults: [],
});

export default function useAssignmentResults() {
  const load = async (id) => {
    state.assignmentResults = [];

    try {
      const response = await axios.get(
        `/assignments/${id}/assignment-results`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;

        state.assignmentResults.push(item);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const show = async (assignmentId, id) => {
    try {
      const response = await axios.get(
        `/assignments/${assignmentId}/assignment-results/${id}`,
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

  const update = async (assignmentId, id, data) => {
    try {
      const response = await axios.put(
        `/assignments/${assignmentId}/assignment-results/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.assignmentResults.findIndex(
        (assignmentResult) => assignmentResult.id === id
      );

      state.assignmentResults[index] = response.data.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, show, update };
}
