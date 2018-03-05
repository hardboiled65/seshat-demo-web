var Seshat = Seshat || SeshatDemo();

Seshat.Demos.Browse.Views.CharacterListView = Backbone.View.extend({
	el: "#containter",
	template: _.template($("#character-list-template").html()),
	events: {
	},

	initialize: function() {
		console.log("CharacterListView.initialize");
		this.collection.bind("reset", this.render, this);
		this.collection.bind("add", this.addOne, this);
		this.render();
	},

	render: function() {
		console.log("CharacterListView.render");
		// Render template.
		$("#container").html(this.template());

		// Calculate character list.
		var codeList = [];
		var code = new CodePoint(0);
		var max = (20 * 16);
		for (var i = 0; i < max; ++i) {
			codeList.push(code);
			code = new CodePoint(code.code + 1);
		}

		// Draw header.
		$("table", "#container").append(
			"<thead><tr><td></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></thead>");
		// Add characters.
		for (var i = 0; i < codeList.length; ++i) {
			if (i % 16 == 0) {
				var range = codeList[i].toString(true).slice(0, -1) + "X";
				$("table", "#container").append("<tr><td>" + range + "</td>");
			}
			if (i % 16 == 15) {
				$("table", "#container").append("</tr>");
			}
			var character = new Seshat.Demos.Browse.Models.Character({
				codePoint: codeList[i].toString(),
				// string: String.fromCodePoint(codeList[i].code)
				string: codeList[i].toCharacter()
			});
			this.addOne(character);
		}
	},

	addOne: function(model) {
		/* TEST */
		// console.log("CharacterListView.addOne");
		var view = new Seshat.Demos.Browse.Views.CharacterView({
			model: model
		});
		$("table tr:last", "#container").append(view.render().el);
		// this.collection.add(character);
		/* TEST END */
	}
});
