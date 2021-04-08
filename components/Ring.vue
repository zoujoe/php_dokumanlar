
<template>
  <div class="ring-container">
    <!-- https://css-tricks.com/building-progress-ring-quickly/ thanks guys :) -->
    <svg class="ring" :height="width" :width="width">
      <circle
        v-if="shadow"
        class="ring-circle shadow"
        :stroke-width="strokeWidth"
        :stroke="colour"
        fill="transparent"
        :r="radius"
        :cx="position"
        :cy="position"
      />
      <circle
        class="ring-circle"
        :style="{ 'stroke-dashoffset': circumference - percent / 100 * circumference, 'stroke-dasharray': `${circumference} ${circumference}` }"
        :stroke-width="strokeWidth"
        :stroke="colour"
        fill="transparent"
        :r="radius"
        :cx="position"
        :cy="position"
      />
    </svg>
    <div class="inside-ring" :style="{ 'width': `${width}px`, 'height': `${width}px`, 'top': `calc(0% + 96px)` }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ring',
  props: {
    width: {
      type: Number,
      default: 128
    },
    strokeWidth: {
      type: Number,
      default: 4
    },