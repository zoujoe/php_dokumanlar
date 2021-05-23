<template>
  <div class="release">
    <img v-if="release.image !== 'no-artwork'" class="release-image" :src="release.image" @click="redirectToRelease(release.id)">
    <div v-else class="release-image no-artwor