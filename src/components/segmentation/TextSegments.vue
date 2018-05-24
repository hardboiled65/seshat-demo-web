<template>
  <p>
    <span class="result-segment" v-for="segment in segments">{{ segment }}</span>
  </p>
</template>

<script>
export default {
  name: 'text-segments',
	props: ['segments'],
	data: function() {
		return {
		}
	}
}
</script>
