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
    b