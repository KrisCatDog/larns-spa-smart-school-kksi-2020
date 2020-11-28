import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  error: null,
  errorEmail: null,
  errorPassword: null,
});

export default function useAuth() {
  const authUser = async () => {
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      return response.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);

      localStorage.setItem("authToken", response.data.token);

      state.error = null;
      state.errorEmail = null;
      state.errorPassword = null;
    } catch (e) {
      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.email
      ) {
        state.errorEmail = e.response.data.errors.email[0];
      } else {
        state.errorEmail = null;
      }

      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.password
      ) {
        state.errorPassword = e.response.data.errors.password[0];
      } else {
        state.errorPassword = null;
      }

      if (e.response.status === 401) {
        state.error = e.response.data.message;
      } else {
        state.error = null;
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(`/logout`, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      localStorage.removeItem("authToken");
    } catch (e) {
      console.log(e.response);
    }
  };

  return { ...toRefs(state), signIn, logout, authUser };
}
