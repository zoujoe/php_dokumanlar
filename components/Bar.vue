<template>
  <div class="bar" :class="[{visible}]">
    <span>
      <slot>Bar content</slot>
    </span>
    <div class="prompt-container">
      <div class="prompt">
        <regular-button type="primary">
          Yes
        </regular-button>
        <regular-button type="primary">
          No
        </regular-button>
        <regular-button type="primary">
          Update
        </regular-button>
      </div>
    </div>
  </div>
</template>

<script>
import regularButton from '~/components/RegularButton'

export default {
  name: 'Bar',
  components: {
    regularButton
  },