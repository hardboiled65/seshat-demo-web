<template>
  <div
    class="base-character">
    <p
      class="base-character-character">{{ character }}</p>
    <p
      class="base-character-code-point">{{ codePoint }}</p>
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
      }
    }
  }
</script>
