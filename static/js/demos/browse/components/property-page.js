var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Browse.Components.PropertyPage = Vue.component('property-page', {
	template: '#properties-template',
	components: {
		property: Seshat.Demos.Browse.Components.Property
	},
	props: ['changed'],
	data: function() {
		var cp = CodePoint.fromString(this.$route.params.cp)
		var codepoint = cp.toString(true)
		var character = cp.toCharacter()
		return {
			codepoint: codepoint,
			character: character,
			name: null,

			prevLink: cp.previous().toString(),
			nextLink: cp.next().toString()
		}
	},
	methods: {
		// Called when 'name-fetched' emitted.
		updateName: function(attr) {
			this.name = attr.name
		},

		prevCharacter: function() {
			if (CodePoint.fromString(this.codepoint, true).code > 0) {
				this.moveCharacter(-1)
			}
		},
		nextCharacter: function() {
			if (CodePoint.fromString(this.codepoint, true).code < 0x10FFFF) {
				this.moveCharacter(1)
			}
		},
		moveCharacter: function(offset) {
			// Change current cp.
			var cp = CodePoint.fromString(this.codepoint, true)
			cp = new CodePoint(cp.code + offset)

			this.codepoint = cp.toString(true)
			this.character = cp.toCharacter()
			this.name = null
			this.prevLink = cp.previous().toString()
			this.nextLink = cp.next().toString()
		}
	},
	watch: {
		'$route': function(to, from) {
			var prev = CodePoint.fromString(from.params.cp)
			var curr = CodePoint.fromString(to.params.cp)
			if (curr.code - prev.code < 0) {
				this.prevCharacter()
			} else {
				this.nextCharacter()
			}
		}
	}
})
