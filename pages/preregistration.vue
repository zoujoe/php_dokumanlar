
<template>
  <div :class="colourMode" class="index">
    <resize-observer @notify="handleResize" />
    <main>
      <masthead :full-width="isFullWidth">
        {{ mastheadText }}
      </masthead>
      <section class="call-to-action-box">
        <h2>Preregister an account now for early access in the near future.</h2>
        <form
          id="preregistration-input-box"
          name="preregistration"
          @submit.prevent="onSignup"
        >
          <div class="call-to-action-content">
            <div class="email-input">