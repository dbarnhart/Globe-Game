//= require Globe
//= require FactoryUnit

GLOBE.Gameplay = function(network, scene) {
	this.scene=scene;
	this.network=network;

	this.units = { factory: new GLOBE.FactoryUnit() };

	//amount of manufactured goods required to build various things
	this.FactoryCost = 10;
	this.SpaceCost = 1000;

	this.reset();
};

GLOBE.Gameplay.prototype.constructor = GLOBE.Gameplay;

GLOBE.Gameplay.prototype.reset = function() {
	this.state = {
		pollution: 0, //planetary pollution
		//current stock of manufactured goods
		manufactured_goods: Math.round(1.5*this.units.factory.cost)
	};

	for(i=0; i<this.network.length; i++) {
		var node = this.network[i];
		if("unit" in node && node.unit!=null) {
			node.unit.erase(this.scene)
			delete node.unit;
		}

		node.unit=null;
	}
}

GLOBE.Gameplay.prototype.handlePlacement = function(placement) {
	var node = this.network[placement];

	if(this.units.factory.clone().place(node, this.state, this.scene) == false) return;

	for(i=0; i<node.neighbours.length; i++) {
		var neighbour = this.network[node.neighbours[i]];
		if(neighbour.unit!=null) {
			node.unit.addNeighbour(neighbour, this.scene);
			//neighbour.addNeighbour(node.unit);
		}
	}
};

GLOBE.Gameplay.prototype.update = function() {
	for(i=0; i<this.network.length; i++) {
		var node = this.network[i];
		if(node.unit == null)	continue;
		node.unit.update(this.state, this.scene);
	}
}