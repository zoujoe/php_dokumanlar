<template>
  <div class="vertical-table">
    <div v-if="!noHeader" class="header">
      <subheading smaller>
        <slot name="header" />
      </subheading>
    </div>
    <div class="table-content" :class="{ 'table-content-curved': noHeader, lessLeftPadding, smallRows }">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import subheading from '~/components/Subheading.vue'

export default {
  name: 'VerticalTable',
  components: {
    subheading
  },
  props: {
    noHeader: Boolean,
    smallRows: Boolean,
    lessLeftPadding: Boolean
  }
}
</script>

<style lang="scss" scoped>
.vertical-table {
  background: $lighter-purple;
  color: black;
  border-radius: 10px;
}
.header {
  padding: 32px;
  padding-bottom: 16px;
}
.table-content {
  // CAVEAT: u