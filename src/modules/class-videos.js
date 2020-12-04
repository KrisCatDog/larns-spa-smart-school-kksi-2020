import { reactive, toRefs } from "vue";
import axios from "axios";

const state = reactive({ classVideos: [] });

export default function useClassVideos() {
  const load = async (id) => {
    state.classVideos = [];

    try {
      const response = await axios.get(`/classrooms/${id}/class-videos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;
        item.isDeleteModalActive = false;
        item.isEditModalActive = false;

        state.classVideos.push(item);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (classroomId, data) => {
    try {
      const response = await axios.post(
        `/classrooms/${classroomId}/class-videos`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      state.classVideos.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const show = async (classroomId, id) => {
    try {
      const response = await axios.get(
        `/classrooms/${classroomId}/class-videos/${id}`,
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
        `/classrooms/${classroomId}/class-videos/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.classVideos.findIndex(
        (classVideo) => classVideo.id === id
      );

      state.classVideos[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId, id) => {
    try {
      await axios.delete(`/classrooms/${classroomId}/class-videos/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.classVideos = state.classVideos.filter(
        (classVideo) => classVideo.id !== id
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store, show, update, destroy };
}
