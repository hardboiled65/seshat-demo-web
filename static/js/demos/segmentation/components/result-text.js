var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Seg.Components.ResultText = Vue.component('result-text', {
	template: '#result-text-template',
	props: ['segments'],
	data: function() {
		return {
		}
	}
})
