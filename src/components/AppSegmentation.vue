<template>
<div id="app-segmentation" class="app-component">
  <header>Text Segmentations - Demos</header>
  <h2>Grapheme cluster</h2>
  <input type="radio" id="segmentation-grapheme" value="grapheme" v-model="type">
  <label for="segmentation-grapheme">Grapheme</label>
  <input type="radio" id="segmentation-word" value="word" v-model="type" disabled="true">
  <label for="segmentation-word">Word</label>
  <div>
    <p>Examples</p>
    <select v-model="text">
      <option>L'incendie a carbonisé la forêt entière.</option>
      <option>나랏〮말〯ᄊᆞ미〮듀ᇰ귁〮에〮달아〮문ᄍᆞᆼ와〮로〮서르ᄉᆞᄆᆞᆺ디〮아니〮ᄒᆞᆯᄊᆡ〮</option>
      <option>ﾊﾟﾝﾊｺﾞﾊﾝﾖﾘｵｲｼｲ</option>
    </select>
  </div>
  <p>Input text</p>
  <input v-model="text">
  <button v-on:click="fetchResult">Result</button>
  <segmentation-result v-if="result" v-bind:breaks="result.breaks"></segmentation-result>
</div>
</template>

<script>
import SegmentationResult from './segmentation/SegmentationResult'

var API_SERVER = 'https://api.libseshat.tk/api/'

var segmentationUrlPath = function(text) {
	return API_SERVER + 'unicode/segmentation/grapheme/' + text
}

var textEscape = function(text) {
	return text.replace(/%/g, '%25')
		.replace(/\//g, '%2F')
}

var _debug = null
export default {
	// template: '#segmentation-template',
  name: 'app-segmentation',
	components: {
		'segmentation-result': SegmentationResult,
	},

	props: {
		type: String,
    default: 'grapheme',
    validator: function(val) {
      return (val === 'grapheme' || val === 'word');
    }
	},

	data: function() {
		return {
			text: '',
			result: null
		}
	},

	created: function() {
		if (!this.$route.params.type) {
			// this.$router.push('segmentation/' + this.type)
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
			var text = this.text.replace(/%/g, '%25')
				.replace(/\//g, '%2F')
            // Change URL.
            this.$router.push({
                path: '', params: { type: this.type, text: text }
            })
            // Get data from the server.
			axios.get(segmentationUrlPath(text))
				.then((res) => {
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
		},
        '$route': function(to, from) {
            if (to.params.text) {
                this.text = textEscape(to.params.text)
                this.fetchResult()
            }
        }
	}
}
</script>
