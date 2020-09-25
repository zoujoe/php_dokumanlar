<template>
  <div :class="[{redBorder, shadow, conservativeMobileView}, colourMode]" class="divided-container">
    <div class="container-content-left" :class="[{hideLeftColumn}]">
      <slot name="left" />
    </div>
    <div class="divider" :class="[{hideLeftColumn}, colourMode]" />
    <div class="container-content-right" :class="[{hideLeftColumn, conservativeMobileView}]">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DividedContainer',
  props: {
    redBorder: Boolean,
    shadow: Boolean,
    hideLeftColumn: Boolean,
    conservativeMobileView: Boolean
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
.divided-container {
  background: $quite-white;
  display: flex;
  width: calc(100% - 80px);
  padding: 30px;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 40px;
  border-radius: 0px 0px 10px 10px;
  transition: all 0.2s linear;
  z-index: 1;
  position: relative;
  &.dark {
    background: $quite-deep-black;
  }
  &:before {
    transform: translateX(-40px) translateY(-35px);
   