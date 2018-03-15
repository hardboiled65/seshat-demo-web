<template>
  <td v-if="codePoint === ''">{{ string }}</td>
  <td v-else>
    <span><router-link :to="'/browse/' + codePoint">{{ string }}</router-link></span>
  </td>
</template>

<script>
export default {
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
}
</script>
