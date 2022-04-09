<template>
  <main class="release">
    <transition name="fade">
      <modal v-if="showAddToListModal" larger-left-side scrollable :image-for-right-side="release.imageHQ" @closeModal="showAddToListModal = false; showCreateListModal = false; showAdjustPositionInListModal = false">
        <template #heading>
          <masthead smaller>
            <span v-if="showCreateListModal">Create new list</span>
            <span v-else-if="showAdjustPositionInListModal">Adjust position in list</span>
            <span v-else>
              Add
              <span v-if="release.title.length < 100">
                {{ release.title }}
              </span>
              <span v-else>
                release
              </span>
              to list</span>
          </masthead>
        </template>
        <template #left>
          <div v-if="showCreateListModal">
            <text-input
              full-width
              maxlength="96"
              placeholder="The inspiration for the list, perhaps?"
              name="new-list-name"
              @input="newList.name = $event"
            >
              List name*
            </text-input>
            <text-area name="new-list-description" full-width placeholder="Descriptions are optional, but they can help give your list some identity and purpose." @input="newList.description=$event">
              List description
            </text-area>
            <div class="flex-container">
              <text-input
                full-width
                placeholder="https://via.placeholder.com/64C/"
                name="new-list-imageURL-input"
                @input="newList.imageURL = $event"
              >
                List image
              </text-input>
              <div class="new-list-image-preview" :style="{ backgroundImage: `url(${newList.imageURL})` }" />
            </div>
            <paragraph soft>
              Image uploading is not currently supported. Consider using a third party service, such as <a href="https://imgur.com/" target="_blank">Imgur</a>.
              Ensure you use a direct link (<a href="https://i.imgur.com/wMeVWI7.png" target="_blank">here's an example</a>, if you're not quite following).
            </paragraph>
            <paragraph softer>
              * Mandatory field.
            </paragraph>
            <div class="flex-container">
              <regular-button wide type="call-to-action" @pressed="createNewList()">
                Create new list
              </regular-button>
              <regular-button no-right-margin type="primary" @pressed="showCreateListModal = false">
                Go back
              </regular-button>
            </div>
          </div>
          <div v-else-if="showAdjustPositionInListModal">
            <release-list editable :list-items="userLists[listItemToAdd.selectedListIndex].releases" max-height="50" :selected-release="release.id" @change="selectedListReleasesOrder = $event" />
            <paragraph softer>
              Press and drag on a release to adjust its position, or press on the rank itself to edit it.
            </paragraph>
            <div class="flex-container">
              <regular-button wide type="call-to-action" @pressed="updateReleasePositionInList">
                Save release positions in list
              </regular-button>
              <regular-button no-right-margin type="primary" @pressed="showAdjustPositionInListModal = false">
                Go back
              </regular-button>
            </div>
          </div>
          <div v-else>
            <dropdown
              name="selected-list"
              description-value="2020 favourites, for example."
              :default-value="listItemToAdd.selectedList"
              :options="userListNames"
              return-index
              @change="listItemToAdd.selectedList = $event[0]; listItemToAdd.selectedListIndex = $event[1]"
            >
              Selected list
            </dropdown>
            <text-area name="list-item-description" full-width placeholder="Descriptions are optional, but should be related to the album or artist if included." @input="listItemToAdd.description=$event">
              Release description
            </text-area>
            <div class="flex-container secondary-list-buttons">
              <regular-button wide type="secondary" @pressed="showCreateListModal = true">
                Create new list
              </regular-button>
              <!-- disabled if a list hasn't been selected *or* if release isn't in list -->
              <regular-button
                wide
                no-right-margin
                type="secondary"
                :disable="!listItemToAdd.selectedList"
                disabled-reason="Please select a list first."
                @pressed="showAdjustPositionInListModal = true"
              >
                Adjust position in list
              </regular-button>
            </div>
            <regular-button wide type="call-to-action" @pressed="addReleaseToList">
              <span v-if="release.title.length <= 128">
                Add {{ release.title }} to list
              </span>
              <span v-else>
                Add release to list
              </span>
            </regular-button>
          </div>
        </template>
      </modal>
      <modal v-if="showUpdateRatingModal" report-width narrow @closeModal="showUpdateRatingModal = false" @widthUpdated="updateRatingModalWidth = $event">
        <template #heading>
          <masthead centred>
            Update rating
          </masthead>
        </template>
        <template #left>
          <ring shadow colour="hsl(252, 70%, 56%)" :width="updateRatingModalWidth - 256" :percent="Number(initialScore)" :stroke-width="4">
            <!-- colour is saturated-purple -->
            <masthead
              class="user-score-input"
              bigger
              centred
              editable
              no-margin
              @change="initialScore = $event"
            >
              86
            </masthead>
          </ring>
        </template>
      </modal>
    </transition>
    <blur loading :apply-blur="loading" />
    <hero :background="release.image">
      <header>
        <nuxt-link
          class="link"
          :to="'/artist/' + release['artist-credit'][0].artist.id"
          :class="colourMode"
        >
          <subheading>
            {{ release['artist-credit'][0].artist.name }}
          </subheading>
        </nuxt-link>
        <masthead>
          <span v-if="release.title">
            {{ release.title }}
          </span>
          <span v-else>
            Loading...
          </span>
        </masthead>
        <tag desaturated>
         