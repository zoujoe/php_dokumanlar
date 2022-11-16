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
        <tag desaturated>
          {{ release.firstReleaseDate[3] }}
          <nuxt-link to="/">
            {{ release.firstReleaseDate[2] }}
          </nuxt-link>
        </tag>
        <div class="tags">
          <tag v-for="tag in release.genres" :key="tag.id">
            {{ tag.name }}
          </tag>
        </div>
      </header>
      <img
        id="release-image"
        class="release-image"
        :class="[colourMode]"
        :src="release.image"
        :alt="release.title"
        @load="loading = false"
      >
    </hero>
    <div v-if="review" class="review-container">
      <article-content>
        <masthead>{{ review.header }}</masthead>
        <div class="flex-container review-author-container">
          <profile-picture :username="review.username" size="small" :url="review.avatar" />
          <div class="review-author">
            <subheading smaller no-margin>
              Review by
              <nuxt-link :to="'/user/' + review.username">
                {{ review.username }}
              </nuxt-link>
            </subheading>
            <subheading smallest no-margin>
              18 December 2020
            </subheading>
          </div>
        </div>
        <div v-for="block in review.body" :key="block.id" class="review-content-block">
          <paragraph v-if=