import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({ classrooms: [] });

export default function useClassrooms() {
  const load = async () => {
    const response = await axios.get(`/classrooms`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    state.classrooms = response.data.data;
  };

  const store = async (data) => {
    const response = await axios.post(`/classrooms`, data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    state.classrooms.unshift(response.data.data);
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
    } catch(e) {
      console.log(e.response);
    }
  }

  return {
    ...toRefs(state),
    load,
    store,
    joinClass
  };
}
