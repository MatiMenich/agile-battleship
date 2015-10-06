var Cell = Backbone.Model.extend({
  defaults: {
    state: "empty"
  },
  fire: function() {
    this.trigger("fire", this);
  },
  updateState: function() {
    if (this.has("boat")) {
      this.get("boat").hit(this);
      this.set("state", "hit");
    } else {
      this.set("state", "miss");
    }
  }
});

var CellView = Backbone.View.extend({
  tagName: "td",
  className: "cell",
  events: {
    "click": "fire"
  },
  initialize: function() {
    _.bindAll(this, "renderBoat", "updateState", "disable");
    this.model.bind("change:boat", this.renderBoat);
    this.model.bind("change:state", this.updateState);
    this.model.bind("change:disabled", this.disable);
  },
  render: function() {
		cell_x = this.model.get("x");
		cell_y = this.model.get("y");
	
		this.$el.attr("id", "cell-" + cell_x + "-" + cell_y);
		// this.$el.html();

		if(cell_x > 10){
			this.disable();
			this.$el.addClass("cell-title-right");
		}
		
		if(cell_y > 10){
			this.disable();
			this.$el.addClass("cell-title-bottom");
		}
		
		if(cell_x === 0) {
			this.disable();
			this.$el.addClass("cell-title-left");
			if(cell_y>0 && cell_y<=10 ){
				this.$el.html(cell_y);		  
			}
		}

		A_charcode = "A".charCodeAt(0);
		if(cell_y === 0) {
			this.disable();
			this.$el.addClass("cell-title-top");
			if(cell_x>0 && cell_x <= 10){
				this.$el.html(String.fromCharCode(A_charcode+cell_x-1));
			}
		}
    this.renderBoat();
    return this;
  },
  renderBoat: function() {
    if (this.model.has('boat')) {
      if (this.model.get("boat").get("visible")) {
        this.$el.addClass("showBoat");
        this.$el.addClass(this.model.get("boat").get("type"));
      }
      this.model.get('boat').bind("change:visible", this.renderBoat);
    }
  },
  updateState: function() {
    if (this.model.get("state") == "hit") {
      // this.$el.addClass("hit");
      this.$el.html("<img class='hit marker animated bounceIn' src='images/1331900690_fire.png'/>");
    } else if (this.model.get("state") == "miss") {
      this.$el.html("<i class='miss marker animated flipInX fa fa-times fa-2x text-muted'></i>");
      // this.$el.html("<img class='miss marker animated flipInX' src='images/1331900805_cross.png'/>");
      this.$el.addClass("miss-cell");
    }
  },
  fire: function() {
    // this.$el.addClass("target");
    this.$el.html("<img class='target marker' src='images/1331901174_bullet_red.png'/>");
    // this.$el.html("<i class='target marker animated slideInDown fa fa-bullseye fa-2x text-info' ></i>");
    this.model.fire();
    this.$el.unbind("click");
  },
  disable: function() {
    this.$el.unbind("click");
  }
});