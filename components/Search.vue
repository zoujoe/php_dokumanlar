
<template>
  <div :class="{ displayingSearchResults: displaySearchResults, desktop }" class="search">
    <paragraph :class="{ displayingSearchResults: displaySearchResults }">
      <div id="search-container" :class="colourMode">
        <input
          id="search-box"
          v-model="searchRequest"
          :class="colourMode"
          :placeholder="'Search...'"
          type="text"
          name="search"
          @keyup.enter="search"
        >
        <nuxt-link
          id="settings-button"
          to="/search"
          class="icon-button"
          :class="colourMode"
          @click.native="$emit('close-search-modal')"
        >
          <settings-icon title="Settings" />
        </nuxt-link>
        <button id="search-button" class="icon-button" type="submit" @click="search">
          <magnify-icon title="Search" />
        </button>
      </div>
    </paragraph>
    <div v-show="displaySearchResults" class="search-results">
      <p v-if="amountOfArtists >= 0 && !loading" class="search-results-amount" :class="colourMode">
        {{ amountOfArtists }}
        <span v-if="amountOfArtists === 1">artist</span>
        <span v-else>artists</span>
        found.
      </p>
      <div id="loading-container" :class="{ loading }" />
      <ul class="search-results-list">
        <li v-for="result in searchResult" :key="result.id" class="search-item">
          <div v-if="searchType === 'artists'">
            <!-- <span v-if="result.aliases">
              AKA
              <span v-for="(alias, i) in result.aliases" :key="alias.id">
                <span
                  v-if="
                    i === result.aliases.length - 1 &&
                      result.aliases.length >= 3
                  "
                >
                  and
                </span>
                <span v-if="alias !== result.name">{{ alias.name }}</span>
                <span v-if="i !== result.aliases.length - 1">, </span>
              </span>
            </span>-->
            <nuxt-link
              :to="'/artist/' + result.id"
              :class="colourMode"
              class="artist-name"
              @click.native="$emit('close-search-modal')"
            >
              {{ result.name }}
            </nuxt-link>
            <div class="tags">
              <tag v-for="tag in result.tags" :key="tag.id" muted>
                {{ tag.name }}
              </tag>
            </div>
          </div>
          <div v-else class="album-item">
            <img
              :src="
                'https://coverartarchive.org/release/' +
                  result.releases[0].id +
                  '/front'
              "
              class="album-art"
            >
            <article>
              <p :class="colourMode">
                {{ result["artist-credit"][0].artist.name }}
              </p>
              <p :class="colourMode" class="artist-name">
                {{ result.title }}
              </p>
            </article>
          </div>
        </li>
      </ul>
      <a v-show="!loading" @click="showModal = !showModal">Can't find what you're looking for?</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import lottie from 'lottie-web'
import SettingsIcon from 'vue-material-design-icons/Settings.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import paragraph from '~/components/Paragraph.vue'
import tag from '~/components/Tag.vue'

import loadingData from '~/assets/loading.json'

export default {
  name: 'Search',
  components: {
    paragraph,