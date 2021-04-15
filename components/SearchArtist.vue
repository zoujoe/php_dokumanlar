
<template>
  <div :class="[colourMode]" class="artist">
    <div>
      <div
        v-if="artist.imageURL !== 'artist-icon'"
        id="artist-image"
        class="artist-image"
        :style="{ 'background-image': `url('${artist.imageURL}'), url('${artist.imageURLLowRes}')` }"
      />
      <div
        v-else
        id="artist-image"
        class="artist-image no-image-found"
      />
      <paragraph soft smaller class="artist-release-name">
        {{ selectedRelease }}
      </paragraph>
    </div>
    <div>
      <!-- <span class="artist-name" :style="calculateDynamicColours('artist-name', artist)">{{ artist.name }}</span> -->
      <p class="artist-name">
        {{ artist.name }}
      </p>
      <div class="tags">
        <!-- <tag v-for="tag in artist.tags" :key="tag.id" :style="{ backgroundColor: artist.imagePalette.DarkVibrant, color: artist.imagePalette.Vibrant }"> -->
        <tag v-for="tag in artist.tags" :key="tag.id">
          {{ tag.name }}
        </tag>
      </div>
      <div class="artist-releases">
        <div
          v-for="(release, name) in artist.releases"
          :key="name"
        >
          <div
            v-if="release.image"
            class="artist-release"
            :style="{ 'background-image': 'url(' + release.image + ')'}"
            @mouseover="selectedRelease = release.title"
            @mouseleave="selectedRelease = ''"
            @click="redirectToRelease(release, name)"
          />
          <div
            v-else
            class="artist-release no-artwork"
            @mouseover="selectedRelease = release.title"
            @mouseleave="selectedRelease = ''"
            @click="redirectToRelease(release, release.id)"
          >
            <span class="release-title-artworkless">{{ getAcronym(release.title) }}</span>
          </div>
        </div>
      </div>
    </div>