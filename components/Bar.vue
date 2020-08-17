<template>
  <div class="bar" :class="[{visible}]">
    <span>
      <slot>Bar content</slot>
    </span>
    <div class="prompt-container">
      <div class="prompt">
        <regular-button type="primary">
          Yes
        </