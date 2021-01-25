
<template>
  <div class="nav-search" :class="{hideBarOnMobile}">
    <text-input
      debounce
      class="search-bar"
      no-bottom-margin
      :focus-highlight="searching"
      placeholder="Search..."
      focus-manual-blur-handling
      @input="searchQuery = $event"
      @focus="updateDisplay"
    >
      <template #icon>
        <magnify-icon v-if="!loadingSearchResults" title="Search" />
        <spinner v-else />
      </template>
    </text-input>
    <div class="search-content-container" :class="[{loadingSearchResults, 'results-layout': resultsLoaded, searching, visible}, colourMode]">
      <div class="search-settings" :class="{ 'results-position': resultsLoaded }">
        <divided-container class="search-settings-divided-container" :class="{resultsLoaded}" shadow :hide-left-column="resultsLoaded" conservative-mobile-view>
          <template #left>
            <subheading smaller no-top-margin>
              Search configuration
            </subheading>
            <paragraph soft>
              Adjust these search parameters to hone in on what you want to find<span v-if="!includeInSearch['artists'] && !includeInSearch['releases']"> (or not, I guess)</span>.
            </paragraph>
          </template>
          <template #right>
            <input-label no-top-margin>
              Include in search
            </input-label>
            <div class="flex-container">