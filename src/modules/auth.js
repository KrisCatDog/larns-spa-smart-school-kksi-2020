import axios from "axios";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
  errorSignin: null,
  errorSigninEmail: null,
  errorSigninPassword: null,
  errorSignup: null,
  errorSignupName: null,
  errorSignupEmail: null,
  errorSignupPassword: null,
});

export default function useAuth() {
  const router = useRouter();

  const authUser = async () => {
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      return response.data.data;
    } catch (e) {
      localStorage.removeItem("authToken");

      router.push({ name: "Signin" });
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);

      localStorage.setItem("authToken", response.data.token);

      state.errorSignin = null;
      state.errorSigninEmail = null;
      state.errorSigninPassword = null;
    } catch (e) {
      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.email
      ) {
        state.errorSigninEmail = e.response.data.errors.email[0];
      } else {
        state.errorSigninEmail = null;
      }

      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.password
      ) {
        state.errorSigninPassword = e.response.data.errors.password[0];
      } else {
        state.errorSigninPassword = null;
      }

      if (e.response.status === 401) {
        state.errorSignin = e.response.data.message;
      } else {
        state.errorSignin = null;
      }
    }
  };

  const signUp = async (credentials) => {
    try {
      const response = await axios.post("/register", credentials);

      localStorage.setItem("authToken", response.data.token);

      state.errorSignup = null;
      state.errorSignupName = null;
      state.errorSignupEmail = null;
      state.errorSignupPassword = null;

      router.replace({ name: "Classrooms" });
    } catch (e) {
      if (e.response.data.errors !== undefined && e.response.data.errors.name) {
        state.errorSignupName = e.response.data.errors.name[0];
      } else {
        state.errorSignupName = null;
      }

      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.email
      ) {
        state.errorSignupEmail = e.response.data.errors.email[0];
      } else {
        state.errorSignupEmail = null;
      }

      if (
        e.response.data.errors !== undefined &&
        e.response.data.errors.password
      ) {
        state.errorSignupPassword = e.response.data.errors.password[0];
      } else {
        state.errorSignupPassword = null;
      }

      if (e.response.status === 401) {
        state.errorSignup = e.response.data.message;
      } else {
        state.errorSignup = null;
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

  return { ...toRefs(state), signIn, logout, authUser, signUp };
}
