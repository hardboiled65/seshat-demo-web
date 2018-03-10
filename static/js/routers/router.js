var Seshat = Seshat || SeshatDemo()

var API_SERVER = "https://api.libseshat.tk/api/"

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'demos',
			component: Seshat.demos
		},
		{
			path: '/browse',
			component: Seshat.Demos.Browse.app,
			props: {
				from: (this.query ? this.query.from : ''),
				codepoint: ''
			},
			children: [
				{
					path: '',
					name: 'browse',
					component: Seshat.Demos.Browse.Components.CharacterList
				},
				{
					path: ':cp',
					name: 'properties',
					component: Seshat.Demos.Browse.Components.PropertyPage,
					props: {
						// codepoint: this.params.cp
					}
				}
			]
		},
		/*
		{
			path: '/browse/:cp',
			name: 'browse',
			component: Seshat.Demos.Browse.Components.PropertyPage,
			props: { codepoint: (this.params ? this.params.cp : '') }
		}
		*/
	],
	mode: 'history'
})
console.log('router created')
