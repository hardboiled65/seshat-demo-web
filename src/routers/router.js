import Vue from 'vue'
import VueRouter from 'vue-router'

import Demos from '../demos/demos-app'
import Browse from '../demos/browse/browse-app'
import CharacterList from '../demos/browse/components/character-list'
import PropertyPage from '../demos/browse/components/property-page'

import Segmentation from '../demos/segmentation/segmentation-app'

// Vue.use(VueRouter)

export default new VueRouter({
// var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'demos',
			component: Demos
		},
		{
			path: '/browse',
			component: Browse,
			props: (route) => ({
				from: (route.query ? route.query.from : ''),
				codepoint: ''
			}),
			children: [
				{
					path: '',
					name: 'browse',
					component: CharacterList
				},
				{
					path: ':cp',
					name: 'properties',
					component: PropertyPage,
					props: {
						// codepoint: this.params.cp
					}
				}
			]
		},
		{
			path: '/segmentation',
			redirect: '/segmentation/grapheme'
		},
		{
			path: '/segmentation/:type?/:text?',
			name: 'segmentation',
			component: Segmentation,
			props: (route) => ({
				type: (route.params ? route.params.type : 'grapheme')
			})
		}
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
