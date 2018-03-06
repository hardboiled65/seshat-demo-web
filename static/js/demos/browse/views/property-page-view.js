var Seshat = Seshat || SeshatDemo();

var _debugView = null;
Seshat.Demos.Browse.Views.PropertyPageView = Backbone.View.extend({
	el: "#container",
	template: _.template($("#properties-template").html()),
	events: {
		"click #btn-left": "prevCharacter",
		"click #btn-right": "nextCharacter"
	},

	initialize: function() {
		this.collection.bind("reset", this.render, this);
		this.collection.bind("add", this.render, this);
		// this.collection.bind("change", this.render, this);
		this.collection.bind("sync", this.fetched, this);

		// Make empty model for rendering first.
		var empty = new this.collection.model({
			codepoint: "U+"
		}).toJSON();
		empty.character = "";
		$(this.el).html(this.template(empty));
	},

	render: function() {
		if (this.model === undefined) {
			this.model = this.collection.at(0);
		}
		var json = this.model.toJSON();
		// console.log(json);
		json.character = CodePoint.fromString(json.codepoint, true).toCharacter();
		// console.log(json);

		$(this.el).html(this.template(json));
		// console.log(this.model);
	},

	fetched: function() {
		// Use last fetched model.
		this.model = this.collection.at(this.collection.length - 1);
		_debugView = this;
		this.render();
		this.disableButtons(false);
	},

	prevCharacter: function() {
		/*
		cp = CodePoint.fromString(this.model.toJSON().codepoint, true);
		if (cp.code > 0) {
			cp = new CodePoint(cp.code - 1);
			router.navigate('/browse/' + cp.toString());
			var found = this.collection.findWhere({ codepoint: cp.toString(true) });
			if (found === undefined) {
				router.properties(cp.toString());
			} else {
				this.model = found;
				this.render();
			}
		}
		*/
		this.moveCharacter(-1);
	},

	nextCharacter: function() {
		/*
		cp = CodePoint.fromString(this.model.toJSON().codepoint, true);
		if (cp.code < 0x10ffff) {
			cp = new CodePoint(cp.code + 1);
			router.navigate('/browse/' + cp.toString());
			var found = this.collection.findWhere({ codepoint: cp.toString(true) });
			console.log(found);
			if (found === undefined) {
				router.properties(cp.toString());
			} else {
				this.model = found;
				this.render();
			}
		}
		*/
		this.moveCharacter(1);
	},

	moveCharacter: function(offset) {
		this.disableButtons(true);
		cp = CodePoint.fromString(this.model.toJSON().codepoint, true);
		if (cp.code < 0x10ffff) {
			cp = new CodePoint(cp.code + (offset));
			router.navigate('/browse/' + cp.toString());
			var found = this.collection.findWhere({ codepoint: cp.toString(true) });
			// console.log(found);
			if (found === undefined) {
				console.log("fetch new");
				router.properties(cp.toString());
			} else {
				console.log("use exist one.");
				this.model = found;
				this.render();
			}
		}
	},

	disableButtons: function(bool) {
		this.$el.find("#btn-left").prop("disabled", bool);
		this.$el.find("#btn-right").prop("disabled", bool);
	}
});
