<template>
  <label :class="[{includeRightMargin}, colourMode]" class="box-label">
    <slot>box-label content</slot>
  </label>
</template>

<script>
export default {
  name: 'BoxLabel',
  props: {
    i