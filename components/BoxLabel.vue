<template>
  <label :class="[{includeRightMargin}, colourMode]" class="box-label">
    <slot>box-label content</slot>
  </label>
</template>

<script>
export default {
  name: 'BoxLabel',
  props: {
    includeRightMargin: Boolean
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit C