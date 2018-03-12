var Seshat = Seshat || SeshatDemo()

var API_SERVER = 'https://api.libseshat.tk/api/'

var segmentationUrlPath = function(text) {
	return API_SERVER + 'unicode/segmentation/grapheme/' + text
}

var textEscape = function(text) {
	return text.replace(/%/g, '%25')
		.replace(/\//g, '%2F')
}

var _debug = null
Seshat.Demos.Seg.app = Vue.component('segmentation', {
	template: '#segmentation-template',
	props: {
		type: String
	},
	data: function() {
		return {
			text: '',
			result: null
		}
	},
	components: {
		results: Seshat.Demos.Seg.Components.Results,
	},
	created: function() {
		if (!this.$route.params.type) {
			this.$router.push('segmentation/' + this.type)
		}
		if (this.$route.params.text) {
			this.text = textEscape(this.$route.params.text)
			this.fetchResult()
			// this.$router.push(this.type + '/' + text)
		}
	},
	computed: {
	},
	methods: {
		fetchResult: function() {
			if (this.text === '') return
			// var text = encodeURIComponent(this.text)
			var text = this.text.replace(/%/g, '%25')
				.replace(/\//g, '%2F')
			axios.get(segmentationUrlPath(text))
				.then((res) => {
					// this.$router.push(this.type + '/' + text)
					this.$router.push({
						path: '', params: { type: this.type, text: text }
					})
					_debug = res.data
					this.result = res.data
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
	watch: {
		text: function() {
		},
		result: function() {
			('seg: result changed')
		}
	}
})
