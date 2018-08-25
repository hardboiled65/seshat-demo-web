<template>
  <table id="table-character-list">
    <thead>
      <tr>
        <th></th>
        <th>0</th><th>1</th><th>2</th><th>3</th>
        <th>4</th><th>5</th><th>6</th><th>7</th>
        <th>8</th><th>9</th><th>A</th><th>B</th>
        <th>C</th><th>D</th><th>E</th><th>F</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in characters">
        <td v-for="character in item">
          <span v-if="character.codePoint !== ''">
            <router-link :to="'/browse/' + character.codePoint">
              <base-character
                v-bind:character="character.string"
                v-bind:code-point="character.codePoint"
                v-bind:show-code-point="false">
              </base-character>
            </router-link>
          </span>
          <span v-else>{{ character.string }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'character-list',
  // template: '#character-list-template',
  components: {
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
}
</script>
