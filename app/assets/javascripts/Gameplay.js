//= require Globe

GLOBE.Gameplay = function(network, scene) {
	this.scene=scene;
	this.network=network;

	this.reset();

	//amount of manufactured goods required to build various things
	this.FactoryCost = 10;
	this.SpaceCost = 1000;
};

GLOBE.Gameplay.prototype.reset = function() {
	this.pollution=0; //planetary pollution
	this.capacity=0; //rate of manufacture
	this.manufactured_goods=this.FactoryCost; //current stock of manufactured goods

	for(i=0; i<this.network.length; i++) {
		var node = this.network[i];
		if("building" in node && node.building!=null) {
			this.scene.removeObject(node.building);
			delete node.building;
		}
		if("joins" in node) {
			for(i=0; i<joins.length; i++) {
				this.scene.removeObject(node.joins[i]);
				delete node.joins[i];
			}
		}

		this.network[i].building=null;
		this.network[i].joins = [];
	}
}

GLOBE.Gameplay.prototype.handlePlacement = function(placement) {
	var node = this.network[placement];

	if(node.building!=null) return;

	var geometry = new THREE.CubeGeometry(50, 50, 50, 1, 1, 1);
	material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
	building = new THREE.Mesh( geometry, material );

	building.position = node.normal.clone().multiplyScalar(20);
	building.position.addSelf(node.position);

	building.lookAt(building.position.clone().addSelf(network[placement].normal));

	this.scene.add(building);

	node.building = building;

	for(i=0; i<node.neighbours.length; i++) {
		var neighbour = this.network[node.neighbours[i]];
		if(neighbour.building != null) {
			var midpoint = node.position.clone().addSelf(neighbour.position).multiplyScalar(0.5);
			var avgnormal = node.normal.clone().addSelf(neighbour.normal);
			var offset = avgnormal.multiplyScalar(40).addSelf(midpoint);
			var joinCurve = new THREE.QuadraticBezierCurve3(node.position, offset, neighbour.position)
			var joinGeom = new THREE.Geometry();
			joinGeom.vertices = joinCurve.getSpacedPoints(8).map(function(value) { return new THREE.Vertex(value); });
			var joinMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00  });
			var join = new THREE.Line( joinGeom, joinMaterial, THREE.LineStrip);

			node.joins.push(join);
			this.scene.add(join);
		}
	}
};

GLOBE.Gameplay.prototype.update = function() {
	this.network
}