<template>
  <table id="table-properties">
    <thead>
      <tr>
        <td>Property</td>
        <td>Value</td>
      </tr>
    </thead>
    <tbody v-for="(mainprops, category) in properties"
        v-if="filter['all'] || filter[category]">
      <tr>
        <th colspan="2">
          {{ (category === 'misc' ? 'miscellaneous' : category) }}
        </th>
      </tr>
      <tr v-for="(value, property) in mainprops">
        <property-name v-bind:api-name="property"></property-name>
        <td>
            {{ ((typeof(value) === "object") ? value.full : ((typeof(value) === "boolean") ? {true: "Yes", false: "No"}[value] : value)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PropertyName from './PropertyName'

var API_SERVER = 'https://api.libseshat.tk/api/'

var propertiesUrlPath = function(cp) {
	return API_SERVER + 'unicode/properties/' + cp
}

var fetchedData = {
	data: {},
	get length() {
		return keys(this.data).length
	},
	push: function(data) {
		this.data[data.codepoint] = data
	},
	find: function(cp) {
		return this.data[cp]
	}
}

export default {
  name: 'property-page-table',
	template: '#property-template',
    components: {
        'property-name': PropertyName
    },
	props: ['codepoint', 'filter'],
	data: function() {
		return {
			properties: {
				binary: {},
				catalog: {},
				enumerated: {},
				misc: {},
				numeric: {},
				string: {}
			}
		}
	},
	created: function() {
		this.fetchedData = fetchedData
		this.fetchData()
	},
	methods: {
		fetchData: function() {
			var found = this.fetchedData.find('U+' + this.$route.params.cp)
			if (found) {
				console.log('using exist one.')
				// Using exist one.
				this.properties = found.properties
				this.$emit('name-fetched', {
					name: this.properties.misc.name
				})
			} else {
				console.log('fetch new data.')
				axios.get(propertiesUrlPath(this.$route.params.cp))
					.then((res) => {
						this.properties = res.data.properties
						// console.log(this.properties)
						this.$emit('name-fetched', {
							name: this.properties.misc.name
						})
						this.fetchedData.push(res.data)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	},
	watch: {
		/*
		codepoint: function() {
			console.log('changed: ' + this.codepoint)
			this.fetchData()
		}
		*/
		'$route': 'fetchData'
	}
}
</script>
