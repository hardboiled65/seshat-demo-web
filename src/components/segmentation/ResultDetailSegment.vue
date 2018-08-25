<template>
  <div class="result-detail-segment">
    <div class="result-detail-head">{{ text }}</div>
    <div class="result-detail-contents">
      <div class="result-detail-inner"
        v-for="(cp, idx) in segment" :key="idx">
        <base-character
          :code-point="cp.codepoint"
          :character="cp.character"
          :show-code-point="true">
        </base-character>
      </div>
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

<style scoped>
  .result-detail-head {
    width: 50px;
    border: 2px solid black;
  }

  .result-detail-segment {
    display: flex;
  }

  .result-detail-contents {
    display: flex;
  }

  .result-detail-inner {
    width: 80px;
    border: 2px dotted black;
    text-align: center;
  }
</style>