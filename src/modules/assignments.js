import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  assignments: [],
});

export default function useAssignments() {
  const load = async (id) => {
    state.assignments = [];

    try {
      const response = await axios.get(`/classrooms/${id}/assignments`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;
        item.isEditModalActive = false;
        item.isDeleteModalActive = false;

        state.assignments.push(item);
      });
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

  const show = async (classroomId, id) => {
    try {
      const response = await axios.get(
        `/classrooms/${classroomId}/assignments/${id}`,
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
        `/classrooms/${classroomId}/assignments/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.assignments.findIndex(
        (assignment) => assignment.id === id
      );

      state.assignments[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId, id) => {
    try {
      await axios.delete(`/classrooms/${classroomId}/assignments/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.assignments = state.assignments.filter(
        (assignment) => assignment.id !== id
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store, show, update, destroy };
}
