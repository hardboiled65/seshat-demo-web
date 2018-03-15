<template>
  <div>
    <p>Result</p>
    <result-text v-bind:segments="segments"></result-text>
    <result-detail v-bind:breaks="breaks" v-bind:segments="segments"></result-detail>
    <!-- <p>breaks: {{ breaks }}</p> -->
    <!-- <p>segments: {{ segments }}</p> -->
  </div>
</template>

<script>
import ResultText from './result-text'
import ResultDetail from './result-detail'

export default {
	props: ['breaks'],
	components: {
		'result-text': ResultText,
		'result-detail': ResultDetail
	},
	data: function() {
		var list = this.getSegments()
		return {
			segments: list
		}
	},
	created: function() {
	},
	methods: {
		getSegments: function() {
			var list = []
			for (var i = 0; i < this.breaks.length; ++i) {
				var segment = ''
				for (var j = 0; j < this.breaks[i].length; ++j) {
					segment += this.breaks[i][j].character
				}
				list.push(segment)
			}
			return list
		}
	},
	watch: {
		breaks: function() {
			this.segments = this.getSegments()
		}
	}
}
</script>
