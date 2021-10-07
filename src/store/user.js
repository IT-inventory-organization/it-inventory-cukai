import axios from "axios";

const baseUrl = process.env.BASE_URL

const user = {
  state: {
    email: "",
    password: "",
  },
  mutations: {
    SET_EMAIL(state, value) {
      state.email = value;
    },
    SET_PASSWORD(state, value) {
      state.password = value;
    },
  },
  actions: {
    async Login(context, payload) {
      const result = await axios({
        url: baseUrl + "login/cukai",
        method: "POST",
        data: {
          // user: 
        }
      })
      console.log(result)
    }
  },
};

export default user;