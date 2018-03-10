var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Browse.app = Vue.component('browse', {
	props: {
		'codepoint': String,
		'from': String // hex number
	},
	template: '#browse-template',
	components: {
		'character-list': Seshat.Demos.Browse.Components.CharacterList,
		'property': Seshat.Demos.Browse.Components.Property
	}
})
