
<template>
  <div class="nav-search" :class="{hideBarOnMobile}">
    <text-input
      debounce
      class="search-bar"
      no-bottom-margin
      :focus-highlight="searching"
      placeholder="Search..."
      focus-manual-blur-handling
      @input="searchQuery = $event"
      @focus="updateDisplay"
    >
      <template #icon>
        <magnify-icon v-if="!loadingSearchResults" title="Search" />
        <spinner v-else />
      </template>
    </text-input>
    <div class="search-content-container" :class="[{loadingSearchResults, 'results-layout': resultsLoaded, searching, visible}, colourMode]">
      <div class="search-settings" :class="{ 'results-position': resultsLoaded }">
        <divided-container class="search-settings-divided-container" :class="{resultsLoaded}" shadow :hide-left-column="resultsLoaded" conservative-mobile-view>
          <template #left>
            <subheading smaller no-top-margin>
              Search configuration
            </subheading>
            <paragraph soft>
              Adjust these search parameters to hone in on what you want to find<span v-if="!includeInSearch['artists'] && !includeInSearch['releases']"> (or not, I guess)</span>.
            </paragraph>
          </template>
          <template #right>
            <input-label no-top-margin>
              Include in search
            </input-label>
            <div class="flex-container">
              <checkbox checked @change="updateSearchQuery('artists', $event); search ('from-input')">
                Artists
              </checkbox>
              <checkbox checked @change="updateSearchQuery('releases', $event); search ('from-input')">
                Releases
              </checkbox>
            </div>
            <div v-if="includeInSearch['releases']">
              <input-label>
                Type of release
              </input-label>
              <dropdown
                name="include-in-search-release-type"
                description-value="Choose which releases are displayed."
                :default-value="releaseTypeName"
                :options="['All release types', 'Singles', 'LPs', 'EPs']"
                @change="findReleaseType($event); search ('from-input')"
              >
                <template #icon>
                  <disc-icon title="Release types" />
                </template>
              </dropdown>
            </div>
            <div v-if="includeInSearch['artists']">
              <input-label>
                Country
              </input-label>
              <dropdown-input
                name="include-in-search-country"
                description-value="Where are the results from?"
                default-value="All countries"
                :options="listOfCountries"
                @change="selectedRegion = $event; search ('from-input')"
              >
                <template #icon>
                  <map-icon title="Country" />
                </template>
              </dropdown-input>
            </div>
            <input-label>
              Amount of results displayed
            </input-label>
            <dropdown-input
              name="amount-of-results"
              description-value=">5 results requires a premium subscription."
              :default-value="amountOfResults"
              :options="[1, 2, 3, 4, 5]"
              @change="amountOfResults = $event; search ('from-input')"
            >
              <template #icon>
                <view-list-icon title="Amount of results" />
              </template>
            </dropdown-input>
            <div v-if="!includeInSearch['artists'] && !includeInSearch['releases']" class="not-on-mobile">
              <paragraph>Don't feel like searching anything? I get it. We all have those days. I hope you're okay, though. Feel free to click outside of this little window to return to the rest of tasteful.</paragraph>
            </div>
          </template>
        </divided-container>
        <divided-container class="search-settings-mobile-results-prompt" :class="{resultsLoaded}" shadow :hide-left-column="resultsLoaded" :conservative-mobile-view="resultsLoaded">
          <template #right>
            <regular-button centre-on-small-screens include-arrow-icon @pressed="resultsLoaded = false">
              Return to search parameters
            </regular-button>
          </template>
        </divided-container>
      </div>
      <regular-button v-if="!resultsLoaded" class="hide-search-button" centre-on-small-screens @pressed="hideSearch">
        Hide search
      </regular-button>
      <div v-if="!resultsLoaded" class="search-content-before-search" @click="hideSearch">
        <!-- only show if search hasnt been made -->
        <div
          v-for="circle in circlesToRender"
          :key="circle.id"
          :style="{ marginLeft: circle.startingPoint[0] + 'px', marginBottom: circle.startingPoint[1] + 'px' }"
          :class="[colourMode]"
          class="circle"
        />
      </div>
      <div v-else class="results-container" @click="hideSearch">
        <div class="results">
          <div>
            <!-- <div v-for="artist in artists" :key="artist.id" class="artist" :style="calculateDynamicColours('artist', artist)"> -->
            <search-artist v-for="artist in artists" :key="artist.id" :artist="artist" @changeSearching="searching = $event" />
          </div>
          <!-- <div v-for="release in releases" :key="release.id" class="artist" :style="calculateDynamicColours('artist', artist)"> -->
          <div class="release-results">
            <search-release v-for="release in releases" :key="release.id" :release="release" @changeSearching="searching = $event" />
          </div>
          <div v-if="!showingResults.artists && !showingResults.releases && !loadingSearchResults">
            <subheading>No results found.</subheading>
            <paragraph>
              I'm sorry I couldn't be better for you.
              Consider using less specific search criteria or ensuring you spelled correctly what you searched for.
              If you're searching for a release, by the way, you only need to search for the release's name.
              For example, search for 'fetch the bolt cutters' instead of 'fiona apple fetch the bolt cutters'.
            </paragraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import magnifyIcon from 'vue-material-design-icons/Magnify.vue'
import anime from 'animejs/lib/anime.es.js'
import mapIcon from 'vue-material-design-icons/Map.vue'
import discIcon from 'vue-material-design-icons/Disc.vue'
import viewListIcon from 'vue-material-design-icons/ViewList.vue'
import countryList from 'country-list'
import _ from 'lodash'
import textInput from '@/components/TextInput.vue'
import dividedContainer from '@/components/DividedContainer.vue'
import subheading from '@/components/Subheading.vue'
import paragraph from '@/components/Paragraph.vue'
import inputLabel from '@/components/InputLabel.vue'
import dropdown from '@/components/Dropdown.vue'
import checkbox from '@/components/Checkbox.vue'
import spinner from '@/components/Spinner.vue'
import searchArtist from '@/components/SearchArtist.vue'
import searchRelease from '@/components/SearchRelease.vue'
import regularButton from '@/components/RegularButton.vue'

export default {
  name: 'NavSearch',
  components: {
    textInput,
    magnifyIcon,
    mapIcon,
    discIcon,
    viewListIcon,
    dividedContainer,
    subheading,
    paragraph,
    inputLabel,
    dropdown,
    checkbox,
    spinner,
    searchArtist,
    searchRelease,
    regularButton
  },
  props: {
    visible: Boolean,
    hideBarOnMobile: Boolean
  },
  data () {
    return {
      searching: false,
      searchQuery: '',
      imageURL: '',
      imageURLLowRes: '',
      loadingSearchResults: false,
      resultsLoaded: false,
      releaseType: false,
      releaseTypeName: 'All release types',
      artists: [],
      releases: [],
      showingResults: {
        artists: false,
        releases: false
      },
      selectedRegion: 'All countries',
      amountOfResults: '3',
      includeInSearch: {
        artists: true,
        releases: true
      }
    }
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    },
    circlesToRender () {
      const amountToRender = _.random(3, 10)
      const circlesToRender = []
      for (let i = 0; i < amountToRender; i++) {
        const circle = {
          startingPoint: [_.random(25, 70), _.random(0, 500)] // x and y , respectively
        }
        circlesToRender.push(circle)
      }
      return circlesToRender
    },
    listOfCountries () {
      const countries = countryList.getNames()
      countries.unshift('All countries')
      return countries
    }