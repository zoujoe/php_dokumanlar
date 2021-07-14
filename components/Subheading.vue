<template>
  <div class="subheading" :class="{ noMargin, topMargin }">
    <h1 :class="[colourMode, { centred, smaller, smallest, titleCase }]" class="subheading-content" :contenteditable="editable" @input="emitValue" @keydown.enter.prevent>
      <slot>Subheading content</slot>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Subheading',
  props: {
    centred: Boolean,
    smaller: Boolean,
    smallest: Boolean,
    noMargin: Boolean,
    editable: Boolean,
    topMargin: Boolean,
    titleCase: Boolean
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    }
  },
  methods: {
    emitValue (element) {
      this.$emit('change', element.target.textContent)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.subheading {
  margin: 0px;
  margin-bottom: 8px;
  &.noMargin {
    margin-bottom: 0px;
  }
  &.topMargin {
    margin-top: 16px;
  }
}
.subheading-content {
  color: $dimmer-purple;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercas