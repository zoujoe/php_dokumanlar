<template>
  <main class="release">
    <transition name="fade">
      <modal v-if="showAddToListModal" larger-left-side scrollable :image-for-right-side="release.imageHQ" @closeModal="showAddToListModal = false; showCreateListModal = false; showAdjustPositionInListModal = false">
        <template #heading>
          <masthead smaller>
            <span v-if="showCreateListModal">Create new list</span>
            <span v-else-if="showAdjustPositio