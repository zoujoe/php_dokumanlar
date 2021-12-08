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
       