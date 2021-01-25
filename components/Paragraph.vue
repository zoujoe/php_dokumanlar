
<template>
  <p
    v-if="!hidden"
    ref="body"
    :class="[{error, soft, softer, smaller, noLeftMarginOnMobile, noTopMargin, noBottomMargin, centred}, colourMode]"
    :contenteditable="editable"
    class="paragraph"
    @input="emitValue"
    @keydown.enter.prevent
  >
    <slot v-if="!truncatedBody && !htmlContent">
      Paragraph content
    </slot>
    <span v-else-if="truncatedBody">{{ truncatedBody }}</span>
  </p>
</template>

<script>
import _ from 'lodash'