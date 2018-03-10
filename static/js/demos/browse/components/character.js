var Seshat = Seshat || SeshatDemo();

Seshat.Demos.Browse.Components.Character = Vue.component('character', {
	template: '#character-template',
	props: ['codePoint', 'string'],
	data: function() {
		return {
			/*
			codePoint: "",
			string: ""
			*/
		}
	}
})
