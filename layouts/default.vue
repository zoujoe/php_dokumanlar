
<template>
  <div id="app" :class="[colourMode]">
    <div v-if="user && user.username === 'lachlantula'">
      <transition name="fade">
        <modal v-if="showModal" scrollable @closeModal="showModal = false">
          <template #heading>
            <subheading no-defined-width smaller no-top-margin>
              <span v-if="showSignIn">Welcome back!</span>
              <span v-else>Welcome aboard!</span>
            </subheading>
          </template>
          <template #left>
            <paragraph>
              <span v-if="showSignIn">It's always a pleasure to see you.</span>
              <span v-else>Well, this is awkward... I guess we've never met. Let's change that.</span>
              <br>
              <a @click="showSignIn = !showSignIn">
                <span v-if="showSignIn">Don't have an account yet?</span>
                <span v-else>Already got an account with us?</span>
              </a>
            </paragraph>
            <!-- <input-label no-top-margin>
              <span v-if="showSignIn">Sign in</span>
              <span v-else>Sign up</span>
            </input-label> -->
            <paragraph v-if="allowSignup && !showSignIn">
              Your Invitation has been approved, so you're good to sign up.
            </paragraph>
            <form @submit.prevent="signIn">
              <text-input name="email-input" placeholder="Email" :class="{'flashRed' : emailFlashRed}" @input="email = $event" @animation-over="emailFlashRed = false">
                <template #icon>
                  <email-icon title="Email" />
                </template>
              </text-input>
              <text-input
                v-if="!showSignIn"
                name="username-input"
                placeholder="Username"
                :class="{'flashRed' : usernameFlashRed}"
                @input="username = $event"
                @animation-over="usernameFlashRed = false"
              >
                <template #icon>
                  <face-icon title="Username" />
                </template>
              </text-input>
              <text-input
                name="password-input"
                placeholder="Password"
                :class="{'flashRed' : passwordFlashRed}"
                password
                @input="password = $event"
                @animation-over="passwordFlashRed = false"
              >
                <template #icon>
                  <key-icon title="Password" />
                </template>
              </text-input>
              <div id="sign-in-button-container">
                <submit-button include-arrow-icon centre-on-small-screens :stop-loading="emailFlashRed || passwordFlashRed || usernameFlashRed" :success="user !== null && user !== false">
                  <span v-if="user === null || user === false" v-text="showSignIn ? 'Sign in' : 'Sign up'" />
                  <span v-else v-text="showSignIn ? 'Signed in' : 'Signed up'" />
                </submit-button>
                <!-- <a v-if="showSignIn" class="soft modal-link" @click="showSignIn = !showSignIn">Having trouble with your password?</a> -->
                <a class="soft modal-link display-only-if-on-mobile" @click="showSignIn = !showSignIn">
                  <span v-if="showSignIn">Don't have an account yet?</span>
                  <span v-else>Already got an account with us?</span>
                </a>
              </div>
            </form>
            <paragraph v-if="error.display" error>
              {{ error.message }}
            </paragraph>
          <!-- <paragraph v-if="!showSignIn" smaller>
              By signing up for tasteful you agree to our Terms of Service and Privacy Policy, as well as the license the Software follows.
            </paragraph> -->
          </template>
        </modal>
      </transition>
      <div v-if="user">
        <span>Logged in as: {{ user.username }}</span>
        <nuxt-link to="/user/settings">
          Go sign out
        </nuxt-link>
      </div>
      <div v-else>
        <button @click="showModal = true">
          Login
        </button>
      </div>
      <div v-if="user">
        <nuxt v-if="user.username === 'lachlantula' || user.username === 'lachlan' || user.username === 'yves'" />
      </div>
      <div v-else>
        that was fun. but it's time for me to go (unless you're logged in as lachlantula).
      </div>
      <bar :visible="barVisible">
        <span v-if="barMessage">{{ barMessage }}</span>
        <span v-else> <!-- little easter egg for the eagle eyed; shows when the editor is closed and after draft is saved -->
          Weeeeeeeeeee! 🙌
        </span>
      </bar>
    </div>
    <div v-else class="advert">
      <article>
        <masthead centred>
          🤞
        </masthead>
        <masthead centred>
          2021 is the goal
        </masthead>
        <subheading centred smaller>
          Follow our Twitter to stay up to date.
        </subheading>
        <regular-button style="margin-top: 16px;" centred type="primary" to="https://twitter.com/tasteful_app">
          Go to our Twitter
        </regular-button>
      </article>
    </div>
  </div>
</template>

<script>
import EmailIcon from 'vue-material-design-icons/Email.vue'
import FaceIcon from 'vue-material-design-icons/Face.vue'
import KeyIcon from 'vue-material-design-icons/Key.vue'
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue'
import Subheading from '@/components/Subheading.vue'
import Paragraph from '@/components/Paragraph.vue'
import TextInput from '@/components/TextInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import bar from '@/components/Bar.vue'
import masthead from '@/components/Masthead.vue'
import subheading from '@/components/Subheading.vue'
import RegularButton from '~/components/RegularButton.vue'

export default {
  components: {
    EmailIcon,
    FaceIcon,
    KeyIcon,
    Modal,
    Subheading,
    Paragraph,
    TextInput,
    SubmitButton,
    bar,
    masthead,
    subheading,
    RegularButton
  },
  layout: 'default',
  data () {
    return {
      showNavbar: true,
      showNavBackground: false,
      lastScrollPosition: 0,
      showModal: false,
      showSignIn: true,
      showSearchModal: false,
      username: '',
      email: '',
      password: '',
      emailFlashRed: false,
      usernameFlashRed: false,
      passwordFlashRed: false,
      noOverflowX: false,
      showMenuOnMobile: false
    }
  },
  computed: mapGetters({
    error: 'login/error',
    user: 'login/user',
    colourMode: 'theme/colourMode',
    colourModeToggle: 'theme/colourModeToggle',
    allowSignup: 'login/allowSignup',
    barVisible: 'interface/barVisible',
    barMessage: 'interface/barMessage'
  }),
  watch: {
    $route (to, from) {
      const routeName = this.$route.name
      if (routeName === 'index') {
        document.title = 'tasteful'
      } else {
        document.title = 'tasteful | ' + routeName
      }
    },
    error (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          error.message = 'Please type your email address in the format person@email.com.'
          this.emailFlashRed = true
          break
        case 'auth/too-many-requests':
          error.message = 'Slow down; your network seems to be showing some weird activity. Try again after a reload.'
          this.emailFlashRed = true
          this.passwordFlashRed = true
          break
        case 'auth/wrong-password':
          error.message = 'Please retype your password - it\'s incorrect.'
          this.passwordFlashRed = true
          break
        case 'auth/user-not-found':
          error.message = 'Couldn\'t find that user, I\'m afraid. Please double-check that you typed your email right.'
          this.emailFlashRed = true
          break
        case 'auth/app-deleted':
        case 'auth/app-not-authorized':
        case 'auth/invalid-api-key':
          this.emailFlashRed = true
          this.passwordFlashRed = true
          error.message = 'There seemed to be a serious error connecting to Firebase. I assume you know what you\'re doing, so the error code is ' + error.code + '.'
          break
        // usernames
        case 'username/symbols':
          this.usernameFlashRed = true
          error.message = 'Keep symbols out of your username, please.'
          break
        case 'username/spaces':
          this.usernameFlashRed = true
          error.message = 'No spaces in usernames, please.'
          break
        case 'username/numbers':
          this.usernameFlashRed = true
          error.message = 'Make sure you\'ve got some letters in your username.'
          break
        case 'username/impersonate':
          this.usernameFlashRed = true
          error.message = 'Please don\'t try to impersonate authority with a username like that. 1312.'
          break
        case 'username/too-short':
          this.usernameFlashRed = true
          error.message = 'Double-check that your username is over three characters long.'
          break
        case 'username/too-long':
          this.usernameFlashRed = true
          error.message = 'Keep your username under 16 characters, cheers.'
          break
        case 'username/taken':
          this.usernameFlashRed = true
          error.message = 'Someone\'s already got that username, unfortunately. Get those creative juices flowing!'
          break
        default:
          this.emailFlashRed = false
          this.passwordFlashRed = false
          this.usernameFlashRed = false
          error.message = 'Not too sure how to handle this one. Code: ' + error.code
      }
    },