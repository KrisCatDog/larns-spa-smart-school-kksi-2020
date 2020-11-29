import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  attendances: [],
});

export default function useAttendances() {
  const load = async (id) => {
    try {
      const response = await axios.get(`/classrooms/${id}/attendances`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.attendances = response.data.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  const store = async (classroomId, data) => {
    try {
      const response = await axios.post(
        `/classrooms/${classroomId}/attendances`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      state.attendances.unshift(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store };
}
