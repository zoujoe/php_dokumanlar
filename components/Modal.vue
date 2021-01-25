
<template>
  <div :class="colourMode" class="modal-container">
    <!-- The old modal design. Nice, but too curvy. Not to body shame or anything.
      <div :class="[colourMode]" class="modal">
      <div id="modal-content-left" class="modal-content">
        <close-icon :class="colourMode" class="large-close-icon" title="Close" @click="closeModal" />
        <div :class="[{scrollable}]">
          <slot name="left" />
        </div>
      </div>
      <div id="modal-content-right" class="modal-content" :class="[{scrollable}]">
        <slot name="right" />
      </div>
    </div> -->

    <!-- The new modal design is a slightly modified DividedContainer, essentially. -->
    <div ref="modal" :class="[{redBorder, shadow, narrow}, colourMode]" class="modal">
      <div class="modal-content-left" :class="{narrow, largerLeftSide}">
        <div :class="{narrow}" class="flex-container">
          <close-icon :class="colourMode" class="large-close-icon" title="Close" @click="closeModal" />
          <slot name="heading" />