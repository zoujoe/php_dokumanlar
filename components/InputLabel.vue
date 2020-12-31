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
  font-weight: 400;
  text-align: left;
  line-height: 2rem;
  max-width: 50ch;
  color: $greyish-blue-dim;
  margin-top: 20px;
  margin-bottom: 5px;
  transition: all 0.2s linea