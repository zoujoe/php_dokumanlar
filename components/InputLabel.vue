<template>
  <p :class="[{error, noTopMargin}, colourMode]" class="input-label">
    <slot>input-label co