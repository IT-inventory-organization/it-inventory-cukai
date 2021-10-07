<template>
  <v-row no-gutters>
    <v-col class="py-2 px-0" cols="12">
      <div class="it-inventory-box">
        <TableInventoryMerah />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ListsInventoryMerah",
  components: {
    TableInventoryMerah: () =>
      import("@/components/dashboard/TableInventoryMerah"),
    // InventoryChart: () => import("@/components/dashboard/InventoryChart"),
  },
};
</script>

<style lang="scss" scoped></style>
