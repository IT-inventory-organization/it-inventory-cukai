import axios from "axios";
import { AESDecrypt } from "@/helper/Encryption.js";
// import Swal from "sweetalert2";
// import router from "@/router/";

const baseUrl = "http://localhost:3000";
// localhost:3000/report/update/updateStatus/:id
const report = {
  state: {
    reportId: "",
    dataApprovalRequest: [],
    reports: [],
    optionsTableApprovalRequest: {
      page: 1,
      itemsPerPage: 10,
    },
    optionsReports: {
      page: 1,
      itemsPerPage: 10,
      status: "All",
    },
    preview: null,
    previewIsLoading: false,
  },
  mutations: {
    SET_DATA_APPROVAL_REQUEST(state, payload) {
      state.dataApprovalRequest = payload;
    },
    SET_REPORTS(state, payload) {
      state.reports = payload;
    },
    SET_OPTIONS_TABLE_APPROVAL_REQUEST(state, payload) {
      state.optionsTableApprovalRequest = Object.assign({}, payload);
    },
    SET_OPTIONS_REPORTS(state, payload) {
      state.optionsReports = Object.assign({}, payload);
    },
    SET_REPORT_ID(state, payload) {
      state.reportId = payload;
      localStorage.setItem("reportId", payload);
    },
    RESET_REPORT_ID(state) {
      state.reportId = "";
      localStorage.removeItem("reportId");
    },
    SET_PREVIEW(state, payload) {
      state.preview = payload;
    },
    SET_PREVIEW_IS_LOADING(state, payload) {
      state.previewIsLoading = payload;
    },
    RESET_PREVIEW(state) {
      state.preview = null;
    },
    HANDLE_UPDATE_STATUS(state, payload) {
      const index = state.dataApprovalRequest.data.findIndex(
        (ele) => ele.nomorAjuan == state.reportId
      );
      if (index !== -1) {
        state.dataApprovalRequest.data[index].jalur = payload;
        state.reports.data = [
          ...state.reports.data,
          state.dataApprovalRequest.data[index],
        ];
        state.dataApprovalRequest.data.splice(index, 1);
        state.dataApprovalRequest["data_size"] -= 1;
      }
    },
  },
  actions: {
    async fetchApprovalRequest(context) {
      const size =
        context.state.optionsTableApprovalRequest.itemsPerPage === -1
          ? 100
          : context.state.optionsTableApprovalRequest.itemsPerPage;
      const result = await axios({
        url:
          baseUrl +
          `/report/get?pageSize=${size}&pageNo=${context.state.optionsTableApprovalRequest.page}&sortBy=oldest&status=Approval`,
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token_it_inventory"),
        },
      });
      if (result.data.success) {
        context.commit(
          "SET_DATA_APPROVAL_REQUEST",
          AESDecrypt(result.data.data)
        );
      }
    },

    async fetchReports(context) {
      const size =
        context.state.optionsReports.itemsPerPage === -1
          ? 100
          : context.state.optionsReports.itemsPerPage;
      const status =
        context.state.optionsReports.status !== "All"
          ? context.state.optionsReports.status.toLowerCase()
          : context.state.optionsReports.status;
      const result = await axios({
        url:
          baseUrl +
          `/report/get?pageSize=${size}&pageNo=${context.state.optionsReports.page}&sortBy=newest&status=${status}`,
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token_it_inventory"),
        },
      });
      if (result.data.success) {
        context.commit("SET_REPORTS", AESDecrypt(result.data.data));
      }
    },

    async previewReport(context) {
      context.commit("SET_PREVIEW_IS_LOADING", true);
      try {
        const result = await axios({
          url: baseUrl + `/report/get/OneReport/${context.state.reportId}`,
          method: "GET",
          headers: {
            authorization:
              "Bearer " + localStorage.getItem("token_it_inventory"),
          },
        });
        if (result.data.success) {
          context.commit("SET_PREVIEW", AESDecrypt(result.data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_PREVIEW_IS_LOADING", false);
      }
    },

    async updateStatus(context, payload) {
      return axios({
        url: baseUrl + `/report/update/updateStatus/${context.state.reportId}`,
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token_it_inventory"),
        },
        data: {
          status: payload,
        },
      });
    },
  },
};

export default report;
