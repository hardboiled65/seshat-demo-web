var Seshat = Seshat || SeshatDemo();

Seshat.Demos.Browse.Models.Property = Backbone.Model.extend({
	defaults: {
		codepoint: "",
		properties: {
			binary: {},
			catalog: {},
			enumerated: {},
			misc: {},
			numeric: {},
			string: {}
		}
	}
});
