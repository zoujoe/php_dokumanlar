<template>
  <div class="hero-container" :class="{fullscreen}">
    <div class="hero-background" :class="{fullscreen}" :style="{ backgroundImage: `url(${background})` }" />
    <div class="hero" :class="{narrow, fullscreen}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    background: {
      type: String,
      default: ''
    },
    narrow: Boolean,
    fullscreen: Boolean
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
.hero-container {
  width: 100%;
}
.hero {
  width: 50vw;
  transition: all