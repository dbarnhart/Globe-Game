//= require Globe
//= require FactoryUnit

GLOBE.Gameplay = function(network, scene) {
	this.scene=scene;
	this.network=network;

	this.units = { factory: new GLOBE.FactoryUnit() };

	this.reset();
};

GLOBE.Gameplay.prototype.constructor = GLOBE.Gameplay;

GLOBE.Gameplay.prototype.reset = function() {
	this.state = {
		pollution: 0.0, //planetary pollution
		//current stock of manufactured goods
		manufactured_goods: 1.5*this.units.factory.cost
	};

	for(i=0; i<this.network.length; i++) {
		var node = this.network[i];
		if("unit" in node && node.unit!=null) {
			node.unit.erase(this.scene)
			delete node.unit;
		}

		node.unit=null;
		this.network[i].resource = null;
	}

	var colors = [];

	for(i=0; i<this.network.length; i++){
		noise = PerlinNoise.noise(this.network[i].position.x, this.network[i].position.y, this.network[i].position.z);
		noise = Math.cos(noise * 85);
		this.network[i].resource = Math.max(noise*8.0-2.0, 0.0);
		colors[i] = new THREE.Color();
		colors[i].setHSV (0.7, 1.0, 1-noise);
	}

	var faces = this.scene.geometry.faces;
	for(i=0; i<faces.length; i++) {
		var face=faces[i];
		var vertexSet = [];
		if(face instanceof THREE.Face3) {
			vertexSet = [face.a, face.b, face.c];
		} else if(face instanceof THREE.Face4) {
			vertexSet = [face.a, face.b, face.c, face.d];
		}

		for(j=0; j<vertexSet.length; j++) {
			face.vertexColors[j]=colors[vertexSet[j]];
		}

		face.color=new THREE.Color( 0x0000ff );
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

GLOBE.Gameplay.prototype.update = function(timestep) {
	for(i=0; i<this.network.length; i++) {
		var node = this.network[i];
		if(node.unit == null)	continue;
		node.unit.update(timestep, this.state, this.scene);
	}
}