<template>
  <div class="profile-picture" :class="[{noClick}, size]" :style="{'background-image': `url(${url}`}" @click="sendToDestination" />
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    url: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    username: {
      type: String,
      default: ''
    },
    noClick: Boolean,
    release: {
      type: String,
      default: ''
    }
  },
  methods: {
    sendToDestination () {
      if (this.noClick) {
        return false
      } else if (this.release) {
        this.$router.push({ path: `/release/${