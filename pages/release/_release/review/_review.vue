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
          <paragraph v-if="block.type === 'paragraph'">
            {{ block.content }}
          </paragraph>
          <div v-else-if="block.type === 'image'" class="review-image-container">
            <img class="review-image" :src="block.url" :alt="block.caption">
            <subheading smaller>
              {{ block.caption }}
            </subheading>
          </div>
        </div>
      </article-content>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import blur from '~/components/Blur.vue'
import masthead from '~/components/Masthead.vue'
import hero from '~/components/Hero.vue'
import subheading from '~/components/Subheading.vue'
import tag from '~/components/Tag.vue'
import regularButton from '~/components/RegularButton.vue'
import textArea from '~/components/TextArea.vue'
import modal from '~/components/Modal.vue'
import dropdown from '~/components/Dropdown.vue'
import paragraph from '~/components/Paragraph.vue'
import articleContent from '~/components/ArticleContent.vue'
import profilePicture from '~/components/ProfilePicture.vue'

export default {
  name: 'ReleaseReview',
  components: {
    blur,
    masthead,
    hero,
    subheading,
    tag,
    regularButton,
    textArea,
    modal,
    dropdown,
    paragraph,
    articleContent,
    profilePicture
  },
  data () {
    return {
      id: this.$route.params.release,
      reviewID: this.$route.params.review,
      averageScore: undefined,
      amountOfRatings: undefined,
      review: undefined,
      release: {
        'artist-credit': [
          {
            artist: {
              name: 'Loading...'
            }
          }
        ],
        firstReleaseDate: []
      },
      reviewContent: {
        header: '',
        body: ''
      },
      listItemToAdd: {
        selectedList: '',
        description: ''
      },
      initialScore: undefined,
      loading: false,
      consideredUser: false,
      showAddToListModal: false
    }
  },
  computed: mapGetters({
    colourMode: 'theme/colourMode',
    user: 'login/user'
  }),
  mounted () {
    this.loading = true
    if (this.release.title === undefined) {
      // if the page is not loaded following a search we must find all the information again
      // get release group info
      this.$axios
        .get(
          `https://us-central1-tasteful.cloudfunctions.net/getReleaseData?query=${this.id}`
        )
        .then((res) => {
          this.release = res.data
          document.title = 'tasteful | ' + this.release.title
          this.getReview()
        })
    } else {
      this.release = this.$store.state.search.release
      document.title = 'tasteful | ' + this.release.title
    }
  },
  methods: {
    getAvatar (id) {
      