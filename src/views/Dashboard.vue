<template>
  <div>
    <div class="it-inventory-card">
      <v-card-title class="it-inventory-card-title"
        >Approval Request</v-card-title
      >
      <v-row no-gutters>
        <v-col class="py-2 px-0" cols="12">
          <div class="it-inventory-box">
            <table-approval-request />
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="it-inventory-card my-6">
      <table-reports />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    TableApprovalRequest: () =>
      import("@/components/dashboard/TableApprovalRequest"),
    TableReports: () => import("@/components/dashboard/TableReports"),
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scope>
.filter_lists_merah {
  & fieldset {
    border-color: #d8dcf2 !important;
  }

  & .v-select__selection {
    color: #8d8ac7;
  }

  & .v-text-field__details {
    display: none !important;
  }
}
</style>
