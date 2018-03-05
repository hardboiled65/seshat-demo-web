var Seshat = Seshat || SeshatDemo();

Seshat.Views.AppView = Backbone.View.extend({
	el: "#container",
	template: _.template($("#demos-template").html()),
	events: {
		"click .link-demos": "clickDemo",
		"click button": "testEvent"
	},

	initialize: function() {
		// this.render();
	},

	render: function() {
		$(this.el).html(this.template());
	},

	clickDemo: function(e) {
		if (e.target.id === "link-demos-browse") {
			if (Seshat.Demos.Browse.characterListView === undefined) {
				Seshat.Demos.Browse.characterListView =
					new Seshat.Demos.Browse.Views.CharacterListView({
						collection: new Seshat.Demos.Browse.Collections.CharacterList()
					});
			}
			router.navigate("/browse");
		} else if (e.target.id === "link-demos-segmentations") {
			console.log("");
		} else {
			alert("debug: not such link");
			console.log(e)
		}
	},

	switchDemo: function(demo) {
		this.demo = demo;
		this.collection = demo.collection;
	},

	testEvent: function(e) {
		// alert("test!");
		console.log(e);
	}
});
