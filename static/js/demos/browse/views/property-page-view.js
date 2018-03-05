var Seshat = Seshat || SeshatDemo();

Seshat.Demos.Browse.Views.PropertyPageView = Backbone.View.extend({
	el: "#container",
	template: _.template($("#properties-template").html()),
	events: {
		// "click #btn-left": "prevCharacter",
		// "click #btn-right": "nextCharacter"
	},

	initialize: function() {
		this.collection.bind("reset", this.render, this);
		this.collection.bind("change", this.render, this);

		// Make empty model for rendering first.
		var empty = new this.collection.model({
			codepoint: "U+"
		}).toJSON();
		console.log(empty);
		empty.character = "";
		$(this.el).html(this.template(empty));
	},

	render: function() {
		var model = this.collection.at(0);
		var json = model.toJSON();
		json.character = CodePoint.fromString(json.codepoint, true).toCharacter();
		// console.log(json);

		$(this.el).html(this.template(json));
		console.log(model);
	}
});
