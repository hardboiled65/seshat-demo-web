var Seshat = Seshat || SeshatDemo();

// var appView = new Seshat.Views.AppView({
// });

/*
var demos = Vue.component('demos', {
	template: '#demos-template'
})
*/

var vm = new Vue({
	el: '#container',
	data: {
		demo: null
	},
	components: {
		demos: Seshat.demos,
		browse: Seshat.Demos.Browse.app
	},
	router: router,
	watch: {
		'$route': function(to, from) {
			// console.log(to)
			// TODO: Remove this code.
			this.demo = to.name
			if (to.name === 'browse' && to.params.cp) {
			}
		}
	}
})

vm.demo = vm.$route.name
