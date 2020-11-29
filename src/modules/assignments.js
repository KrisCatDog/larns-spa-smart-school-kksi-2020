import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  assignments: [],
});

export default function useAssignments() {
  const load = async (id) => {
    try {
      const response = await axios.get(`/classrooms/${id}/assignments`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.assignments = response.data.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (classroomId, data) => {
    try {
      const response = await axios.post(
        `/classrooms/${classroomId}/assignments`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      state.assignments.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store };
}
