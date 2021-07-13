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
  co