<template>
  <main class="release-review">
    <transition name="fade">
      <modal v-if="showAddToListModal" scrollable :image-for-right-side="release.imageHQ" @closeModal="showAddToListModal = false">
        <template #heading>
          <masthead smaller>
            Add release to list
          </masthead>
        </template>
        <template #left>
          <dropdown
            name="selected-list"
            description-value="2020 favourites, for example."
            :options="['Example list 1', 'Example list 2']"
          >
            Selected list
          </dropdown>
          <text-area name="list-item-description" full-width placeholder="Descriptions are optional, but should be related to the album or artist if included." @input="listItemToAdd.description=$event">
            Description
          </text-area>
          <regular-button wide type="call-to-action">
            Add to list
          </regular-button>
        </template>
      </modal>
    </transition>
    <blur loading :apply-blur="loading" />
    <hero :background="release.image">
      <header>
        <nuxt-link
          class="link"
          :to="'/artist/' + release['artist-credit'][0].artist.id"
          :class="colourMode"
        >
          <subheading>
            {{ release['artist-credit'][0].artist.name }}
          </subheading>
        </nuxt-link>
        <masthead>
          <span v-if="release.title">
            {{ release.title }}
          </span>
          <span v-else>
            Loading...
          </span>
        </masthead>
        <tag desa