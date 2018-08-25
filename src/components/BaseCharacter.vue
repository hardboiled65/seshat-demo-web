<template>
  <div
    class="base-character">
    <p class="base-character-character">{{ character }}</p>
    <p class="base-character-code-point"
      v-if="showCodePoint">{{ codePoint }}</p>
  </div>
</template>

<script>
  export default {
    name: 'base-character',

    props: {
      codePoint: {
        type: String,
        required: true
      },

      character: {
        type: String,
        required: true
      },

      characterName: {
        type: String,
        default: ''
      },

      showCodePoint: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .base-character-character {
    margin: 0;
    white-space: pre;
    font-size: 20pt;
    font-weight: bold;
  }

  .base-character-code-point {
    margin: 0;
  }
</style>