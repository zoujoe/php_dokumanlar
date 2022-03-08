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
            <release-list editable :list-items=