<template>
  <main class="about">
    <transition name="fade">
      <modal v-if="showModal" @closeModal="showModal = false">
        <template #left>
          <masthead centred>
            Donation destination
          </masthead>
          <paragraph>
            All of these are Australian organisations. We may donate to non-Australian organisations
            at some point in the future, but these are groups that we trust and usually have personal experience with,
            and as such can vouch for their quality.
          </paragraph>
        </template>
        <template #right>
          <paragraph-container>
            <subheading>November</subheading>
            <paragraph>
              In November, tasteful focuses on <strong>mental health</strong>, and why wouldn't we?  It's an incredibly
              poignant issue that deeply influences many members of the music community - both consumers and creators alike.
              <list>
                <li>
                  🦋 <a href="https://www.beyondblue.org.au/">Beyond Blue</a> - fantastic resource for seeking help for a wide variety of
                  mental illnesses.
                </li>
                <li>
                  🐕 <a href="https://www.blackdoginstitute.org.au/">Black Dog Institute</a> - pioneers research into mental health
                  and the treatment of such.
                </li>
              </list>
              If you need help urgently, please don't hesitate to contact your
              <a href="https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines">local crisis line</a>. 💜
            </paragraph>
          </paragraph-container>
        </template>
      </modal>
    </transition>
    <article-content>
      <masthead centred smaller full-width>
        Donate
      </masthead>
      <paragraph-container>
        <subheading>Thank you for even considering donating!</subheading>
        <paragraph>
          It truly means the world, and your donations will go to directly to the tasteful team,
          unless stated otherwise on the tier. Let's talk about how to unlock the full buffet of features tasteful has been cooking up over the last year or two.
        </paragraph>
        <paragraph smaller>
          All prices are in $USD.
        </paragraph>
      </paragraph-container>
    </article-content>
    <div id="tiers-container" :class="colourMode">
      <masthead smaller fit-width centred>
        Tiers
      </masthead>
      <div id="tiers">
        <div id="lowest-tier" :class="colourMode" class="tier">
          <div class="tier-content">
            <subheading>$3<span :class="colourMode" class="money-amount">/mo</span> 🥞</subheading>
            <paragraph>
              The base tier has the following benefits...
              <list>
                <li>❌ No advertisements.</li>
                <li>Early access to major tasteful updates (ie 0.x.0 versions).</li>
                <li>Receive the kinda nice and neat Silver Supporter badge! It's pretty cool.</li>
              </list>
            </paragraph>
          </div>
        </div>
        <div id="middle-tier" :class="colourMode" class="tier">
          <div class="tier-content">
            <subheading>$5<span :class="colourMode" class="money-amount">/mo</span> 🍨</subheading>
            <paragraph>
              Get the same bonuses as the $3/mo folk, in addition to the following...
              <list>
                <li>More nuanced profile customisation.</li>
                <li>Unlock every single customisation option for the website and make tasteful your own.</li>
                <li>Receive the very special and cool Golden Supporter badge! How pretty.</li>
              </list>
            </paragraph>
          </div>
        </div>
        <div id="highest-tier" :class="colourMode" class="tier">
          <div class="tier-content">
            <subheading>$10<span :class="colourMode" class="money-amount">/mo</span> 🌟</subheading>
            <paragraph>
              Receive all the benefits of the other tiers, and...
              <list>
                <li>Use minor updates (ie 0.x.x rather than 0.x.0 'major' updates) early, live on the official tasteful website.</li>
                <li>Get deeper insight into what I'm working on and what's coming next.</li>
                <li>Receive the Platinum Titanium Cool Mineral Supporter badge. Very impressive stuff. You deserve it.</li>
              </list>
            </paragraph>
          </div>
        </div>
      </div>
    </div>
    <hero
      no-padding
      inside-padding
      smaller-image
      no-definitive-height
      dont-show-right-on-mobile
    >
      <template #left>
        <subheading>
          The Care Package
        </subheading>
        <paragraph>
          The Care Package is, essentially, just a donation to express your gratitude.
          I know that it seems self-indulgent to put this as an option, but we really want to give the opportunity for our users to not
          only keep the doors open here, but to also unlock even more doors for the awesome open-source projects that keep tasteful
          working around-the-clock.
        </paragraph>
        <paragraph>
          In addition to those causes, every month a quarter of all Care Package donations goes to a specific cause.
          <!-- You can view our current destination <a @click="showModal = !showModal">here</a>. -->
        </paragraph>
        <paragraph>
          Donations will be split amongst the following <strong>every month</strong>:
          <list>
            <li>🙋‍♀️ The tasteful team.</li>
            <li>🧠 <a href="https://musicbrainz.org/">MusicBrainz</a></li>
            <li>👩‍💻 <a href="https://vuejs.org/">Vue.js</a></li>
          </list>
        </paragraph>
        <subheading smaller>
          💰 Starting from $5
        </subheading>
      </template>
      <template #right>
        <div>
          <img id="screenshot" src="@/assets/images/screenshot.png" alt="Screenshot of tasteful code.">
          <paragraph class="faded">
            I can see myself from here!
          </paragraph>
        </div>
      </template>
    </hero>
  </main>
</template>

<script>
// @ is an alias to /src
import masthead from '~/components/Masthead.vue'
import subheading from '~/components/Subheading.vue'
import articleContent from '~/components/ArticleContent.vue'
import paragraphContainer from '~/components/ParagraphContainer.vue'
import paragraph from '~/components/Paragraph.vue'
import modal from '~/components/Modal.vue'
import list from '~/components/List.vue'
import hero from '~/components/Hero.vue'

export default {
  name: 'Donate',
  components: {
    masthead,
    subheading,
    articleContent,
    paragraph,
    paragraphContainer,
    modal,
    list,
    hero
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    }
  }
}
</script>

<style lang="scss" scoped>
.article-content {
  margin-left: auto;
  margin-right: auto;
}

#tiers-c