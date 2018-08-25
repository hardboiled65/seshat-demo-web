<template>
<div>
  <!-- <div
    class="result-detail-parent"
    v-for="(br, index) in breaks"
    v-bind:key="index">
    <div class="result-detail-head">{{ segments[index] }}</div>
    <div
      class="result-detail-inner"
      v-for="cp in br">
      <p class="character">{{ cp.character }}</p>
      <p>{{ cp.codepoint }}</p>
    </div>
  </div> -->
  <result-detail-segment
    v-for="(segment, idx) in breaks" :key="idx"
    :segment="segment">
  </result-detail-segment>
</div>
</template>

<script>
import ResultDetailSegment from './ResultDetailSegment'

export default {
  name: 'result-detail',
  components: {
    'result-detail-segment': ResultDetailSegment
  },

	props: {
    breaks: {
      type: Array
    },
    segments: {
      type: Array
    }
  },

	data: function() {
		return {
		}
	}
}
</script>
