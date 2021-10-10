<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dataApprovalRequest.data"
      :options.sync="optionsTableApprovalRequest"
      :server-items-length="dataApprovalRequest.data_size"
      no-data-text="Data not available"
      no-results-text="Data not available"
      class="it-inventory-simple-table"
    >
      <template v-slot:[`item.no`]="props">
        {{ props.index + 1 }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn outlined color="blue" @click="handlePreview(item.nomorAjuan)">
          <v-icon left> mdi-format-list-bulleted </v-icon>
          view
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogPreview" persistent width="1400px">
      <data-preview @handleCloseDialog="handleCloseDialog" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TableApprovalRequest",
  components: {
    DataPreview: () => import("@/views/DataPreview/DataPreview"),
  },
  data() {
    return {
      dialogPreview: false,
      headers: [
        {
          text: "No",
          value: "no",
        },
        {
          text: "Jenis Inventory",
          value: "jenisInventory",
        },
        {
          text: "Nomor Ajuan",
          value: "nomorAjuan",
        },
        { text: "Tanggal Ajuan", value: "tanggalAjuan" },
        { text: "Pengirim", value: "pengirim" },
        { text: "Penerima", value: "penerima" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  watch: {
    optionsTableApprovalRequest: {
      handler() {
        this.$store.dispatch("fetchApprovalRequest");
      },
      deep: true,
    },
  },
  computed: {
    dataApprovalRequest() {
      return this.$store.state.report.dataApprovalRequest;
    },
    optionsTableApprovalRequest: {
      get() {
        return this.$store.state.report.optionsTableApprovalRequest;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_APPROVAL_REQUEST", val);
      },
    },
  },
  methods: {
    handlePreview(reportId) {
      this.dialogPreview = true;
      this.$store.commit("SET_REPORT_ID", reportId);
      this.$store.dispatch("previewReport");
    },
    async handleCloseDialog() {
      this.dialogPreview = false;
      await this.$store.commit("RESET_PREVIEW");
      await this.$store.commit("RESET_REPORT_ID");
    },
  },
  created() {
    this.$store.dispatch("fetchApprovalRequest");
  },
};
</script>

<style lang="scss" scoped></style>
