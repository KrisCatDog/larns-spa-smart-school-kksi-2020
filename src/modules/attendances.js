import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  attendances: [],
});

export default function useAttendances() {
  const load = async (id) => {
    state.attendances = [];

    try {
      const response = await axios.get(`/classrooms/${id}/attendances`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      response.data.data.forEach((item) => {
        item.isSettingModalActive = false;
        item.isDeleteModalActive = false;
        item.isEditModalActive = false;

        state.attendances.push(item);
      });
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

  const show = async (classroomId, id) => {
    try {
      const response = await axios.get(
        `/classrooms/${classroomId}/attendances/${id}`,
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
    state.errorStore = null;

    try {
      const response = await axios.put(
        `/classrooms/${classroomId}/attendances/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.attendances.findIndex(
        (attendance) => attendance.id === id
      );

      state.attendances[index] = response.data.data;
    } catch (e) {
      state.errorStore = e.response.status;
    }
  };

  const destroy = async (classroomId, id) => {
    try {
      await axios.delete(`/classrooms/${classroomId}/attendances/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      state.attendances = state.attendances.filter(
        (attendance) => attendance.id !== id
      );
    } catch (e) {
      console.log(e.response);
    }
  };

  const storeRespond = async (id, data) => {
    try {
      const response = await axios.post(
        `/attendances/${id}/attendance-responds`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = state.attendances.findIndex(
        (attendance) => attendance.id === id
      );

      state.attendances[index].attendance_responds.push(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), load, store, storeRespond, show, destroy, update };
}
