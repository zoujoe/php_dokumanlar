:<template>
  <div class="pill" :class="{alt, smaller}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Pill',
  props: {
    alt: Boolean,
    smaller: 