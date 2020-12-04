import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({ classrooms: [], errorStore: null });

export default function useClassrooms() {
  const load = async () => {
    state.classrooms = [];

    try {
      const response = await axios.get(`/classrooms`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;
        item.isDeleteModalActive = false;
        item.isEditModalActive = false;
        item.isLeaveClassModalActive = false;

        state.classrooms.push(item);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (data) => {
    state.errorStore = null;

    try {
      const response = await axios.post(`/classrooms`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.classrooms.unshift(response.data.data);
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const update = async (uuid, data) => {
    state.errorStore = null;

    try {
      const response = await axios.put(`/classrooms/${uuid}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const index = state.classrooms.findIndex(
        (classroom) => classroom.uuid === uuid
      );

      state.classrooms[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId) => {
    try {
      await axios.delete(`/classrooms/${classroomId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.classrooms = state.classrooms.filter(
        (classroom) => classroom.uuid != classroomId
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  const joinClass = async (data) => {
    try {
      const response = await axios.post(`/classrooms/join-class`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.classrooms.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const leaveClass = async (uuid) => {
    try {
      await axios.post(`/classrooms/${uuid}/leave-class`, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.classrooms = state.classrooms.filter(
        (classroom) => classroom.uuid != uuid
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  return {
    ...toRefs(state),
    load,
    store,
    joinClass,
    destroy,
    update,
    leaveClass,
  };
}
