<template>
  <p :class="[{error, noTopMargin}, colourMode]" class="input-label">
    <slot>input-label content</slot>
  </p>
</template>

<script>
export default {
  name: 'InputLabel',
  props: {
    error: Boolean,
    noTopMargin: Boolean
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-label {
  font-size: 1rem;
  