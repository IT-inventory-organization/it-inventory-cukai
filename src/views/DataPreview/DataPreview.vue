<template>
  <v-card>
    <v-card-title>
      <v-row no-gutters justify="end">
        <span style="cursor: pointer" @click="handleCloseDialog"
          ><v-icon>mdi-close</v-icon></span
        >
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters class="mt-2" align="center" justify="space-between">
        <div class="title" style="color: black">Lang ILC</div>
        <div>
          <v-btn
            class="ma-2"
            outlined
            color="#3CB774"
            @click="updateJalur('hijau')"
          >
            Hijau
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            color="#F9B800"
            @click="updateJalur('kuning')"
          >
            Kuning
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            color="#DE3D33"
            @click="updateJalur('merah')"
          >
            Merah
          </v-btn>
        </div>
      </v-row>
      <div class="preview-container">
        <v-progress-linear
          v-if="previewIsLoading"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
        <preview-dokumen v-if="!previewIsLoading" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataPreview",
  components: {
    PreviewDokumen: () => import("@/components/plb_ppftz/PreviewDokumen"),
  },
  computed: {
    previewIsLoading() {
      return this.$store.state.report.previewIsLoading;
    },
  },
  methods: {
    handleCloseDialog() {
      console.log("close");
      this.$emit("handleCloseDialog");
    },
    updateJalur(jalur) {
      this.$store
        .dispatch("updateStatus", jalur)
        .then((result) => {
          if (result.data.success) {
            this.$store.commit("HANDLE_UPDATE_STATUS", jalur);
            this.$swal({
              title: "Berhasil Di Update",
              icon: "success",
            }).then((result) => {
              if (result) this.handleCloseDialog();
            });
          }
        })
        .catch(() => {
          this.$swal.fire("Gagal Update", "", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-container {
  width: max-content;
  margin: 3rem auto;
  border: 1px solid #d8dcf2;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .preview-container {
    margin: 0 !important;
    transform: scale(0.5) !important;
  }
}

@media (max-width: 900px) {
  .preview-container {
    margin: 0 !important;
    transform: scale(0.8) !important;
  }
}
</style>
