<template>
<div>
  <div
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
  </div>
</div>
</template>

<script>
export default {
  name: 'result-detail',
	props: ['breaks', 'segments'],
	data: function() {
		return {
		}
	}
}
</script>
