import { reactive, toRefs } from "vue";
import axios from "axios";

const state = reactive({ announcements: [] });

export default function useAnnouncements() {
  const load = async (id) => {
    const response = await axios.get(`/classrooms/${id}/announcements`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    state.announcements = response.data.data;
  };

  const store = async (classroomId, data) => {
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
  };

  return { ...toRefs(state), load, store };
}
