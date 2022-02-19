
<template>
  <main class="invite-container">
    <blur loading :apply-blur="loading" />
    <div v-if="user === null || user === false">
      <div class="invite">
        <article-content>
          <masthead centred smaller>
            Invites
          </masthead>
          <divided-container>
            <template #left>
              <subheading smaller no-top-margin>
                Invites
              </subheading>
              <paragraph>@lachlantula doesn't have any. Don't ask him.</paragraph>
            </template>
            <template #right>
              <form @submit.prevent="testInvitation">
                <text-input
                  v-model="inviteCode"
                  :class="{'flashRed' : flashRed}"
                  full-width
                  name="invite-code-input"
                  placeholder="Invite code"
                  @animation-over="flashRed = false"
                >
                  <template #icon>
                    <key-icon decorative title="Invite code" />
                  </template>
                </text-input>
                <text-input v-model="inviteSeed" :class="{'flashRed' : flashRed}" full-width name="invite-seed-input" placeholder="Invite seed">
                  <template #icon>
                    <fingerprint-icon decorative title="Invite seed" />
                  </template>
                </text-input>
                <submit-button
                  smaller
                  include-arrow-icon
                  centre-on-small-screens
                  :stop-loading="flashRed"
                  :success="inviteSubmitted"
                >
                  <span>Leave RYM</span>
                </submit-button>
              </form>
              <paragraph v-if="inviteSubmitted">
                Your Invitation has been approved; you may now sign up via the login form. Welcome aboard!
              </paragraph>
            </template>
          </divided-container>
          <paragraph-container>
            <subheading>What's an invite seed, an invite code, and an Invitation?</subheading>
            <paragraph>
              An <strong>invite seed</strong> is an eight-character set of alphanumeric characters that is used to significantly reduce the
              likelihood of a randomly-guessed invite code from being successful in developing an Invitation.