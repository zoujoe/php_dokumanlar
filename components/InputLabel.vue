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
      return this.$store.