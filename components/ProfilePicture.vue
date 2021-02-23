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
    s