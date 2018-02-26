var Seshat = {
	Models: {},
	Collections: {},
	Views: {}
};

//==----------------------
// Models
//==----------------------

Seshat.Models.Property = Backbone.Model.extend({
	defaults: {
		property: "",
		value: ""
	}
});

Seshat.Models.PropertyList = Backbone.Model.extend({
});

//==----------------------
// Collections
//==----------------------

Seshat.Collections.Properties = Backbone.Collection.extend({
	model: Seshat.Models.Property,
	url: "/data.json",
	/*
	url: function() {
		console.log(this.document.url());
		return "data.json";
	},
	*/

	initialize: function() {
		// console.log("Collections.Properties.initialize");
	}
});

var properties_template = _.template($("#template-properties").html());
var property_template = _.template($("#template-property").html());

//==----------------------
// Views
//==----------------------

Seshat.Views.Properties = Backbone.View.extend({
	el: $("#properties-box"),
	template: properties_template,

	initialize: function() {
		// console.log("Views.Properties.initialize");
		this.collection.bind("reset", this.render, this);
		this.collection.bind("add", this.addOne, this);
	},

	render: function() {
		// console.log("Views.Properties.render");
		// $(this.el).html(this.template());
		this.addProperties();
	},

	addProperties: function() {
		this.collection.each(this.addOne);
		if (this.collection.length > 0) {
		}
	},

	addOne: function(model) {
		console.log(model.url());
		view = new Seshat.Views.Property({ model: model });
		$("table", this.el).append(view.render());
	},

	dummy: function() {
		// delete later
	}
});

Seshat.Views.Property = Backbone.View.extend({
	tagName: "tr",
	template: property_template,

	initialize: function() {
		// console.log("Views.Property.initialize");
	},

	render: function() {
		// console.log("Views.Property.render");
		// console.log(this.model.toJSON());
		var obj = {
			prop: "name",
			val: this.model.attributes.properties.misc.name
		};
		$(this.el).append(this.template(obj));
		return $(this.el);
	}
});

Seshat.Router = Backbone.Router.extend({
	routes: {
		"": "defaultRoutes",
		"browse/:cp": "browseCodePoint"
	},

	browseCodePoint: function(cp) {
		Seshat.properties = new Seshat.Collections.Properties();
		Seshat.properties.url = function() {
			return "http://localhost:8000/api/unicode/properties/" + cp;
		}
		new Seshat.Views.Properties({ collection: Seshat.properties });
		Seshat.properties.fetch({
			dataType: 'json'
		});
	},

	defaultRoutes: function() {
		console.log("default routes");
		Seshat.properties = new Seshat.Collections.Properties();
		Seshat.properties.url = function() {
			// console.log(Backbone.history.location.href);
			return "data.json?a=1";
		}
		new Seshat.Views.Properties({ collection: Seshat.properties });
		Seshat.properties.fetch();
	}
});

var router = new Seshat.Router();
Backbone.history.start({ pushState: true });
