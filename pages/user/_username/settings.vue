
<template>
  <main class="user">
    <!-- blur while loading -->
    <blur loading :apply-blur="loading" />
    <article-content v-if="user !== null && user.username === '' && !loading">
      <!-- If no username was found on the account... -->
      <masthead centred smaller>
        Add username
      </masthead>
      <paragraph-container>
        <subheading>Hi!</subheading>
        <paragraph>
          Thank you so much for preregistering and sticking with me throughout
          this long development time. I really appreciate your patience.
        </paragraph>
        <paragraph>
          tasteful's gone under some major fundamental changes as I've continued
          to learn more as I go, and unfortunately I've had to reset all
          usernames due to several bugs. This will not happen again; my first
          attempt was elementary and, admittedly, untested.
        </paragraph>
        <paragraph>
          <strong>Please enter your desired username.</strong>
        </paragraph>
        <form class="username-input-container" @submit.prevent="submitUsername">
          <text-input
            v-model="usernameToSubmit"
            no-bottom-margin
            name="username-input"
            placeholder="Username"
            :class="{ flashRed: usernameError }"
            @animation-over="usernameError = false"
          >
            <template #icon>
              <face-icon title="Username" />
            </template>
          </text-input>
          <submit-button
            include-arrow-icon
            :stop-loading="usernameError"
            :success="username !== undefined"
          >
            <span>Submit</span>
          </submit-button>
        </form>
        <paragraph v-if="error.display" error no-left-margin-on-mobile>
          {{ error.message }}
        </paragraph>
      </paragraph-container>
    </article-content>
    <article-content
      v-else-if="loading === false && (user === false || user === null)"
    >
      <paragraph-container>
        <subheading>How'd we get here?</subheading>
        <paragraph>
          I think you might want to log in to access this page.
        </paragraph>
      </paragraph-container>
    </article-content>
    <article-content v-else wider>
      <!-- the actual settings part -->
      <masthead centred smaller>
        Settings
      </masthead>
      <!-- <divided-container id="public-profile">
        <template #left>
          <subheading smaller no-top-margin>
            Public profile
          </subheading>
          <paragraph soft>
            These are preferences that control things that are visible to the
            public.
          </paragraph>
        </template>
        <template #right>
          <input-label no-top-margin>
            Display name
          </input-label>
          <text-input
            name="display-name-input"
            placeholder="This is what people see on your profile."
            default-value="Hello"
            full-width
            @input="update('display name', $event)"
          >
            <template #icon>
              <face-icon title="Display name" />
            </template>
          </text-input>
          <input-label>
            Username (the one in your URL)
          </input-label>
          <text-input
            name="username-input"
            placeholder="This is how people get to your profile."
            :default-value="!loading ? user.username : ''"
            full-width
            @input="update('username')"
          >
            <template #icon>
              <link-icon title="Username" />
            </template>
          </text-input>
          <input-label>
            Pronouns
          </input-label>
          <div class="flex-container">
            <dropdown
              name="pronouns-input-one"
              description-value="A pronoun."
              :options="['he', 'she', 'they', 'ze', 'xey', 'any']"
              full-width
              right-margin
              @change="update('pronouns', $event)"
            >
              <template #icon>
                <gender-male-female-icon title="Pronouns" />
              </template>
            </dropdown>
            <dropdown
              no-icon
              name="pronouns-input-two"
              description-value="Another pronoun!"
              :options="['him', 'her', 'them', 'hir', 'zir', 'xem', 'xyr', 'all']"
              full-width
              @change="update('pronouns', $event)"
            />
          </div>
        </template>
      </divided-container> -->
      <divided-container>
        <template #left>
          <subheading smaller no-top-margin>
            Theming
          </subheading>
          <paragraph soft>
            Your changes will persist across sessions, but not different browsers and devices at this stage.
          </paragraph>
        </template>
        <template #right>
          <input-label no-top-margin>
            Currently selected theme
          </input-label>
          <dropdown
            name="selected-theme-input"
            description-value="Which lovely theme will you choose?"
            :default-value="colourMode"
            :options="['light', 'dark', 'solarised-light', 'solarised-dark', 'black']"
            full-width
            @change="update('theme', $event)"
          >
            <template #icon>
              <palette-icon title="Selected theme" />
            </template>
          </dropdown>
          <!-- <input-label>
            Dynamic colouring
          </input-label>
          <checkbox>It's enabled. This may impact performance.</checkbox> -->
          <input-label>
            Navbar theme toggle options
          </input-label>
          <div class="flex-container">
            <dropdown
              name="navbar-theme-toggle-input-one"
              description-value="A nice theme."
              :default-value="colourModeToggle[0]"
              :options="['light', 'solarised-light']"
              full-width
              right-margin
              @change="update('theme-toggle', [0, $event])"
            >
              <template #icon>
                <invert-colours-icon title="Navbar theme toggle" />
              </template>
            </dropdown>
            <dropdown
              no-icon
              name="navbar-theme-toggle-input-two"
              description-value="Another theme that you like (we hope)."
              :default-value="colourModeToggle[1]"
              :options="['dark', 'solarised-dark', 'black']"
              full-width
              @change="update('theme-toggle', [1, $event])"