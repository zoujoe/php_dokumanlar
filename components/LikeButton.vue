<template>
  <div class="like-button-container">
    <button class="like-button" @click="$emit('liked')">
      <heart-icon v-if="likedCondition" class="favourited-icon" />
      <heart-icon v-else class="unfavourited-ic