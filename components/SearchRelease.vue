<template>
  <div class="release">
    <img v-if="release.image !== 'no-artwork'" class="release-image" :src="release.image" @click="redirectToRelease(release.id)">
    <div v-else class="release-image no-artwork" @click="redirectToRelease(release.id)">
      <span class="release-title-artworkless">{{ release.title }}</span>
    </div>
    <paragraph>{{ release['artist-credit'][0].artist.name }} - {{ release.title }}</paragraph>
  </div>
</template>

<script>
import paragraph from '@/components/Paragraph.vue'

export default {
  name: 'SearchResult',
  components: {
    paragraph
  },
  props: 