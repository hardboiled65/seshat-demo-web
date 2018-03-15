<script>
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
	template: '#property-template',
	props: ['codepoint'],
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
