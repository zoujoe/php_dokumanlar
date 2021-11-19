
<template>
  <main class="artist">
    <article-content>
      <masthead centred smaller>
        {{ artist.name }}
      </masthead>
      <list>
        <li>Country: {{ artist.country }}</li>
        <li>Gender: {{ artist.gender }}</li>
      </list>
      <section v-if="singles.length > 0">
        <subheading>Singles</subheading>
        <list>
          <li v-for="(single, index) in singles" :key="index">
            {{ single.title }}
          </li>
        </list>
      </section>
      <section v-if="mixtapes.length > 0">
        <subheading>Mixtapes</subheading>
        <list>
          <li v-for="(mixtape, index) in mixtapes" :key="index">
            {{ mixtape.title }}
          </li>
        </list>
      </section>
      <section v-if="albums.length > 0">
        <subheading>Albums</subheading>
        <list>
          <li v-for="(album, index) in albums" :key="index">
            {{ album.title }}
          </li>
        </list>
        <section v-if="live.length > 0">
          <subheading no-top-margin smaller>
            Live
          </subheading>
          <list>
            <li v-for="(album, index) in live" :key="index">
              {{ album.title }}
            </li>
          </list>
        </section>
      </section>
      <section v-if="extendedPlays.length > 0">
        <subheading>EPs</subheading>
        <list>
          <li v-for="(ep, index) in extendedPlays" :key="index">
            {{ ep.title }}
          </li>
        </list>
      </section>
      <section v-if="broadcasts.length > 0">
        <subheading>Broadcasts</subheading>
        <list>
          <li v-for="(broadcast, index) in broadcast" :key="index">
            {{ broadcast.title }}
          </li>
        </list>
      </section>
      <section v-if="others.length > 0">
        <subheading>Other</subheading>
        <list>
          <li v-for="(other, index) in others" :key="index">
            {{ other.title }}
          </li>
        </list>
      </section>
    </article-content>
  </main>
</template>

<script>
// @ is an alias to /src
import masthead from '~/components/Masthead.vue'
import articleContent from '~/components/ArticleContent.vue'
import subheading from '~/components/Subheading.vue'
import list from '~/components/List.vue'

export default {
  name: 'Artist',
  components: {
    masthead,
    articleContent,
    subheading,
    list
  },
  data () {
    return {
      id: this.$route.params.id,
      artist: {
        name: 'Querying...'
      },
      singles: [],