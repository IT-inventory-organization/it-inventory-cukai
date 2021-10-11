import axios from "axios";
import { AESEncrypt } from "@/helper/Encryption.js";
import Swal from "sweetalert2";
import router from "@/router/";
import config from "../config.json";

const baseUrl = config.baseURL;

const user = {
  state: {
    email: "",
    password: "",
    token: "",
  },
  mutations: {
    SET_EMAIL(state, value) {
      state.email = value;
    },
    SET_PASSWORD(state, value) {
      state.password = value;
    },
    RESET_LOGIN(state) {
      state.email = "";
      state.password = "";
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async Login(context) {
      try {
        const dataLogin = {
          email: context.state.email,
          password: context.state.password,
        };
        const result = await axios({
          url: `${baseUrl}/login/bea-cukai`,
          method: "POST",
          data: {
            dataLogin: AESEncrypt(dataLogin),
          },
        });
        context.commit("RESET_LOGIN");
        context.commit("SET_TOKEN", result.data.data);
        localStorage.setItem("token_it_inventory", result.data.data);
        router.push("/dashboard");
      } catch (error) {
        if (error.message === "Network Error") {
          Swal.fire("Tidak ada jaringan!", "", "error");
        }
        const response = error.response.data;
        if (!response.success) {
          Swal.fire("Gagal!", response.message, "error");
        }
      }
    },
  },
};

export default user;
