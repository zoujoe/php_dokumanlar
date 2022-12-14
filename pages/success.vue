<template>
  <main class="success">
    <article-content>
      <masthead centred smaller full-width>
        Thanks for preregistering!
      </masthead>
      <paragraph-container>
        <subheading>You're in, {{ username }}!</subheading>
        <paragraph>
          Your early support of tasteful is extremely appreciated, and I am
          grateful from the bottom of my heart. Please be aware, though, that
          any nicknames proposed in pre-registration may be disregarded at my
          own discretion. This will be largely limited to merely hate speech and
          impersonation of an official tasteful account.
        </paragraph>
      </paragraph-container>
      <paragraph-container>
        <subheading>What's next?</subheading>
        <paragraph>
          tasteful has  a long road ahead, but by preregistering you've earned yourself
          <strong>early access</strong>
          to new features as they are developed. You can see where we're going from here by visiting
          <nuxt-link to="/roadmap">
            our roadmap.
          </nuxt-link>
        </paragraph>
      </paragraph-container>
      <img src="~/assets/love.gif" alt="thank you ❤️">
    </article-content>
  </main>
</template>

<script>
import masthead from '~/components/Masthead.vue'
import subheading from '~/components/Subheading.vue'
import articleContent from '~/com