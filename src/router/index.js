import Vue from 'vue'
import VueRouter from 'vue-router'

import AppDemos from '../components/AppDemos'

import AppBrowse from '../components/AppBrowse'
import CharacterList from '../components/browse/CharacterList'
import PropertyPage from '../components/browse/PropertyPage'

import AppSegmentation from '../components/AppSegmentation'

// Vue.use(VueRouter)

export default new VueRouter({
// var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'demos',
			component: AppDemos
		},
		{
			path: '/browse',
			component: AppBrowse,
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
			component: AppSegmentation,
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
