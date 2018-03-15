<template>
  <div id="browse" class="app-component">
    <header>Character Browser - Demos</header>
    <router-view></router-view>
  </div>
</template>

<script>
import CharacterList from './components/character-list'
import Property from './components/property'

export default {
    name: 'browse',
	props: {
		'codepoint': String,
		'from': String // hex number
	},
	template: '#browse-template',
	components: {
		'character-list': CharacterList,
		'property': Property
	}
}
</script>
