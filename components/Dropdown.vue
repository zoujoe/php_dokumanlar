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
      @change="reportValue"
    >
      <option disabled>
        {{ descriptionValue }}
      </option>
      <option v-for="option in options" :key="option.id">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    descriptionValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    returnIndex: Boolean,
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    alternate: Boolean
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    },
    placeholder () {
      if (this.value === this.descriptionValue) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.defaultValue) {
      this.value = this.defaultValue
    } else if (this.descriptionValue) {
      this.value = this.descriptionValue
    } else {
      this.value = this.options[0]
 