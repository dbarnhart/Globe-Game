//= require Globe

GLOBE.Unit = function(name, cost, production, pollution) {
	this.name = name;
	this.cost = cost;
	this.production = production || cost;
	this.pollution = pollution || this.production;
	this.node = null;
};

GLOBE.Unit.prototype.addToScene = function(scene) {};

GLOBE.Unit.prototype.removeFromScene = function(scene) {};

GLOBE.Unit.prototype.addNeighbour = function(neighbour, scene) {};

GLOBE.Unit.prototype.place = function(node, state, scene) {
	if(node.unit != null) return false;
	if(state.manufactured_goods < this.cost) return false;

	this.node=node;
	node.unit=this;
	this.addToScene(scene);

	state.manufactured_goods -= this.cost;

	return true;
};

GLOBE.Unit.prototype.remove = function(state, scene) {
	this.erase(scene);
};

GLOBE.Unit.prototype.erase = function(scene) {
	this.node=null;
	this.removeFromScene(scene);
};

GLOBE.Unit.prototype.getProduction = function(state) {
	return this.production;
};

GLOBE.Unit.prototype.getPollution = function(state) {
	return this.production;
};

GLOBE.Unit.prototype.update = function(timestep, state, scene) {
	state.manufactured_goods += this.production*timestep;
	state.pollution += this.pollution*timestep;
};

GLOBE.Unit.prototype.clone = function() {
	return new GLOBE.Unit(this.name, this.cost, this.production, this.pollution);
};