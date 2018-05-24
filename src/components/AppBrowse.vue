<template>
  <div id="app-browse" class="app-component">
    <header>Character Browser - Demos</header>
    <router-view></router-view>
  </div>
</template>

<script>
import CharacterList from './browse/CharacterList'
import PropertyPage from './browse/PropertyPage'

export default {
  name: 'app-browse',
	props: {
		'codepoint': String,
		'from': String // hex number
	},
	template: '#browse-template',
	components: {
		'character-list': CharacterList,
		'property-page': PropertyPage
	}
}
</script>
