
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