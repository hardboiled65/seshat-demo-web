<template>
  <div class="result-detail-segment">
    <div class="result-detail-head">{{ text }}</div>
    <div class="result-detail-contents">
      <base-character
        v-for="(cp, idx) in segment" :key="idx"
        :code-point="cp.codepoint"
        :character="cp.character">
      </base-character>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'result-detail-segment',

    props: {
      segment: {
        type: Array,
        required: true
      }
    },

    computed: {
      text() {
        var _str = '';
        this.segment.forEach(function(code) {
          _str += code.character;
        });
        return _str;
      }
    }
  }
</script>
