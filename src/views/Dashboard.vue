<template>
  <div class="it-inventory-card">
    <v-card-title class="it-inventory-card-title"
      >Approval Request</v-card-title
    >

    <v-row no-gutters class="pt-4">
      <v-col class="px-0" cols="12" lg="6" sm="12">
        <v-select
          clearable
          class="filter_lists_merah"
          v-model="filterType"
          outlined
          dense
          :items="filterListsJalurMerah"
        />
      </v-col>
    </v-row>
    <lists-inventory-merah />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    // DisplayCount: () => import("@/components/dashboard/DisplayCount"),
    ListsInventoryMerah: () =>
      import("@/components/dashboard/ListsInventoryMerah"),
  },
  data() {
    return {
      lists: [
        { export: 450, import: 250, status: "hijau" },
        { export: 320, import: 275, status: "kuning" },
        { export: 140, import: 50, status: "merah" },
      ],
      filterListsJalurMerah: ["Import", "Export", "All"],
      filterType: "All",
    };
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
