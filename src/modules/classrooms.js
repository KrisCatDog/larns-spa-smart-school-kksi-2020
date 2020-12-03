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

  return {
    ...toRefs(state),
    load,
    store,
    joinClass,
  };
}
