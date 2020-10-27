<template>
  <div class="dropdown-container">
    <label class="dropdown-label" :for="name">
      <slot />
    </label>
    <select
      v-model="value"
      :name="name"
      :class="[{placeholder, alternate}, colourMode]"
      v-bind="$attrs"
      class="dropdown"
      @change="reportV