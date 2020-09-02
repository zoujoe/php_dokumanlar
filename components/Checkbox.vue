
<template>
  <div :class="{noRightMargin}" class="checkbox-container-container-container-container-container">
    <label :class="[colourMode]" class="checkbox-container">
      <input :checked="checked" class="checkbox" type="checkbox" @change="emitCheckboxValue">
      <span :class="[colourMode]" class="checkmark" />
      <div class="content"><slot /></div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    noRightMargin: Boolean,
    checked: Boolean
  },
  computed: {
    colourMode () {
      return this.$store.state.theme.colourMode
    }
  },
  methods: {
    emitCheckboxValue (event) {
      this.$emit('change', event.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-container, .checkmark {
  transition: all 0.2s linear;
}
.checkbox-container-container-container-container-container {
  padding-left: 5px;
  margin-right: 15px;
  &.noRightMargin {
    margin-right: 0;
  }
}
.checkbox-container {
  &.light {
    color: $greyer-blue-dim;
  }
  &.dark {
    color: $greyer-blue;
  }
}
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-container, .content {
  height: 25px;
}

.content {
  display: flex;
  align-items: center;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;