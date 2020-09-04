<template>
  <div :class="[{redBorder, shadow, conservativeMobileView}, colourMode]" class="divided-container">
    <div class="container-content-left" :class="[{hideLeftColumn}]">
      <slot name="left" />
    </div>
    <div class="divider" :class="[{hideLeftColumn}, colourMode]" />
    <div cl