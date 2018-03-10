var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Browse.Components.CharacterList = Vue.component('character-list', {
	template: '#character-list-template',
	components: {
		character: Seshat.Demos.Browse.Components.Character
	},
	props: ['from'],
	data: function() {
		var characters = []
		var ch = 0;
		for (var i = 0; i < 20; ++i) {
			characters.push([])
			for (var j = 0; j < 16; ++j) {
				var cp = new CodePoint(ch++)
				if (j === 0) {
					characters[i].push({
						codePoint: '',
						string: cp.toString(true).slice(0, -1) + 'X'
					})
				}
				characters[i].push({
					codePoint: cp.toString(),
					string: cp.toCharacter()
				})
			}
		}
		return {
			characters: characters
		}
	}
})
