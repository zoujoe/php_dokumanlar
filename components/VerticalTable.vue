<template>
  <div class="vertical-table">
    <div v-if="!noHeader" class="header">
      <subheading smaller>
        <slot name="header" />
      </subheading>
    </div>
    <div class="table-content" :class="{ 'table-content-curved': noHeader, lessLeftPaddi