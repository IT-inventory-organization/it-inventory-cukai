<template>
  <v-row no-gutters>
    <v-col cols="11"> </v-col>
    <v-col cols="1">
      <v-select
        class="filter_lists"
        v-model="optionsReports.status"
        outlined
        dense
        :items="filterLists"
      />
    </v-col>
    <v-col class="py-2 px-0" cols="12">
      <div class="it-inventory-box">
        <v-data-table
          :headers="headers"
          :items="reports.data"
          :options.sync="optionsReports"
          :server-items-length="reports.data_size"
          no-data-text="Data not available"
          no-results-text="Data not available"
          class="it-inventory-simple-table"
        >
          <template v-slot:[`item.no`]="props">
            {{ props.index + 1 }}
          </template>
          <template v-slot:[`item.jalur`]="{ item }">
            <approval-badge :status="item.jalur" />
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TableReports",
  components: {
    ApprovalBadge: () => import("@/components/ApprovalBadge"),
  },
  data() {
    return {
      filterLists: ["All", "Hijau", "Kuning", "Merah"],
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
        { text: "Jalur", value: "jalur" },
      ],
    };
  },
  watch: {
    optionsReports: {
      handler() {
        this.$store.dispatch("fetchReports");
      },
      deep: true,
    },
  },
  computed: {
    reports() {
      return this.$store.state.report.reports;
    },
    optionsReports: {
      get() {
        return this.$store.state.report.optionsReports;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_REPORTS", val);
      },
    },
  },
  created() {
    this.$store.dispatch("fetchReports");
  },
};
</script>

<style lang="css" scope>
.filter_lists .v-text-field__details {
  display: none !important;
}
.filter_lists .v-select__selection {
  color: #8d8ac7;
}
.filter_lists fieldset {
  border-color: #d8dcf2 !important;
}
</style>
