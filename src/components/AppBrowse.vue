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
	components: {
		'character-list': CharacterList,
		'property-page': PropertyPage
	},

  props: {
		codepoint: {
      type: String,
      default: ''
    },

		from: {
      type: String, // hex number
      required: false
    }
	}
	//template: '#browse-template',
}
</script>
