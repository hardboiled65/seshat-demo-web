var Seshat = Seshat || SeshatDemo()

Seshat.Demos.Seg.Components.ResultDetail = Vue.component('result-detail', {
	template: '#result-detail-template',
	props: ['breaks', 'segments'],
	data: function() {
		return {
		}
	}
})
