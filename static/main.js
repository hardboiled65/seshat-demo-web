var _debug = null;

var API_SERVER_DBG = "http://localhost:8000/api/"
var API_SERVER_RUN = "https://api.libseshat.tk/api/"
var API_SERVER = API_SERVER_RUN

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
	model: Seshat.Models.PropertyList,
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
		// this.collection.each(this.addOne);
		if (this.collection.length > 0) {
			var propertyListModel = this.collection.at(0);
			var propertyList = propertyListModel.toJSON();
			_debug = propertyList;
			for (var cat in propertyList.properties) {
				for (var prop in propertyList.properties[cat]) {
					if (prop == "name") {
						this.setName( propertyList.properties[cat][prop]);
					}
					var name = propertyNames[prop]
					var property = new Seshat.Models.Property({
						property: (name ? name : prop),
						value: propertyList.properties[cat][prop]
					});
					this.addOne(property);
				}
			}
		}
	},

	addOne: function(model) {
		view = new Seshat.Views.Property({ model: model });
		$("table", this.el).append(view.render());
	},

	setName: function(name) {
		$("#character-name").html(name);
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
		/*
		var obj = {
			prop: "name",
			val: this.model.attributes.properties.misc.name
		};
		*/
		// $(this.el).append(this.template(obj));
		$(this.el).append(this.template(this.model.toJSON()));
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
			return API_SERVER_RUN + "unicode/properties/" + cp;
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
