var Seshat = Seshat || SeshatDemo();

Seshat.Demos.Browse.Views.CharacterView = Backbone.View.extend({
	tagName: "td",
	template: _.template($("#character-template").html()),
	events: {},

	initialize: function() {
		// console.log("CharacterView.initialize");
	},

	render: function() {
		$(this.el).append(this.template(this.model.toJSON()));
		// console.log(this.el);
		return this;
	}
});
