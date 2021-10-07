<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="it-inventory-simple-table"
  >
    <template v-slot:[`item.status`]="{ item }">
      <approval-badge :status="item.status"></approval-badge>
    </template>
    <template v-slot:[`item.no`] = "props">
      {{props.index + 1}}
    </template>
    <template v-slot:[`item.actions`]>
      <v-btn outlined color="blue">
        <v-icon>mdi-delete</v-icon>
        view
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TableInventoryMerah",
  components: {
    ApprovalBadge: () => import("@/components/ApprovalBadge"),
  },
  data() {
    return {
      headers: [
        {
          text: "No",
          value: "no"
        },
        {
          text: "Jenis Inventory",
          value: "jenisInventory",
        },
        {
          text: "Nomor Ajuan",
          value: "nomorAjuan"
        },
        { text: "Tanggal Ajuan", value: "tanggalAjuan" },
        { text: "Pengirim", value: "pengirim" },
        { text: "Penerima", value: "penerima" },
        { text: "Actions", value: "actions"}
      ],
      data: [
        {
          nomorAjuan: "BC-49494-8233",
          jenisInventory: "PLB - BC 4.1",
          tanggalAjuan: "12-11-2013",
          tanggalDaftar: "12-11-2013",
          pengirim: "Emelina",
          penerima: "Paton",
          status: "merah",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
