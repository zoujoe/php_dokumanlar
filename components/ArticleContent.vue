<template>
  <div :class="[{ wider }]" class="article-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: {
 