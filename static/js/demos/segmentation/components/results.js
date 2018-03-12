var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Seg.Components.Results = Vue.component('results', {
	template: '#results-template',
	props: ['breaks'],
	components: {
		'result-text': Seshat.Demos.Seg.Components.ResultText,
		'result-detail': Seshat.Demos.Seg.Components.ResultDetail
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
})
