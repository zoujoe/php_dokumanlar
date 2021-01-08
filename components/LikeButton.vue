<template>
  <div class="like-button-container">
    <button class="like-button" @click="$emit('liked')">
      <heart-icon v-if="likedCondition" class="favourited-icon" />
      <heart-icon v-else class="unfavourited-icon" />
    </button>
    <p class="likes" @click="showModal = true">
      {{ likes }}
    </p>
    <transition name="fade">
      <modal v-if="showModal" @closeModal="showModal = false">
        <template #heading>
          <masthead smaller>
            Review likers
          </masthead>
        </template>
        <template #left>
          <ul>
      