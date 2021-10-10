<template>
  <div
    class="it-invent-badge-approval"
    :style="{
      backgroundColor:
        status === 'hijau'
          ? '#3CB774'
          : status === 'merah'
          ? '#DE3D33'
          : '#F9B800',
    }"
  ></div>
</template>

<script>
export default {
  name: "ApprovalBadge",
  data() {
    return {
      ColorLine: "",
    };
  },
  props: ["status"],
};
</script>

<style lang="scss" scoped>
.it-invent-badge-approval {
  width: max-content;
  min-width: 30px;
  height: 8px;
  border-radius: 8px;
}
</style>
