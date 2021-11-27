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
           