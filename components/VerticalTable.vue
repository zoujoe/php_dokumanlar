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
.vertical-table 