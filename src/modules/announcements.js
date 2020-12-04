import { reactive, toRefs } from "vue";
import axios from "axios";

const state = reactive({ announcements: [] });

export default function useAnnouncements() {
  const load = async (id) => {
    state.announcements = [];

    try {
      const response = await axios.get(`/classrooms/${id}/announcements`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;
        item.isEditModalActive = false;
        item.isDeleteModalActive = false;

        state.announcements.push(item);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (classroomId, data) => {
    try {
      const response = await axios.post(
        `/classrooms/${classroomId}/announcements`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      state.announcements.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const show = async (classroomId, id) => {
    try {
      const response = await axios.get(
        `/classrooms/${classroomId}/announcements/${id}`,
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
        `/classrooms/${classroomId}/announcements/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.announcements.findIndex(
        (announcement) => announcement.id === id
      );

      state.announcements[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId, id) => {
    try {
      await axios.delete(`/classrooms/${classroomId}/announcements/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.announcements = state.announcements.filter(
        (announcement) => announcement.id !== id
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store, show, update, destroy };
}
