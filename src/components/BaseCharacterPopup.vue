<template>
  <div
    class="base-character-popup">
  </div>
</template>

<script>
  export default {
    name: 'base-character-popup',

    props: {
      codePoint: {
        type: String,
        required: true
      },

      character: {
        type: String,
        required: true
      }
    }
  }
</script>
