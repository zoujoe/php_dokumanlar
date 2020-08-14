<template>
  <div :class="[{ wider }]" class="article-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: {
    wider: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.article-content {
  width: 30vw;
  &.wider {
    width: auto;
    m