var Seshat = Seshat || { Views: {} };

var API_SERVER = "https://api.libseshat.tk/api/"

Seshat.Router = Backbone.Router.extend({
	routes: {
		"": "index",
		"browse": "browse",
		"browse/": "browse",
		"browse/:cp": "properties"
	},

	initialize: function() {
		appView = new Seshat.Views.AppView();
	},

	index: function() {
		appView.render();
	},

	browse: function() {
		if (Seshat.Demos.Browse.characterListView === undefined) {
			Seshat.Demos.Browse.characterListView =
				new Seshat.Demos.Browse.Views.CharacterListView({
					collection: new Seshat.Demos.Browse.Collections.CharacterList()
				});
		} else {
			Seshat.Demos.Browse.characterListView.render();
		}
	},

	properties: function(cp) {
		// Initialize if not exist.
		if (Seshat.Demos.Browse.properties === undefined) {
			Seshat.Demos.Browse.properties =
				new Seshat.Demos.Browse.Collections.PropertyPage(null, {});
			console.log("new collection: " + Seshat.Demos.Browse.properties.length);
		}
		var properties = Seshat.Demos.Browse.properties; // alias
		properties.url = function() {
			return API_SERVER + "unicode/properties/" + cp;
		}
		if (Seshat.Demos.Browse.propertyListView === undefined) {
			Seshat.Demos.Browse.propertyListView =
				new Seshat.Demos.Browse.Views.PropertyPageView({
					collection: properties
				});
		}
		properties.fetch({
			remove: false,
			dataType: "json"
		});
	}
});

var router = new Seshat.Router();
Backbone.history.start({ pushState: true });
