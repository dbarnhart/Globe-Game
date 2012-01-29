//= require Unit

GLOBE.FactoryUnit = function() {
	GLOBE.Unit.call(this, 'Factory', 10);

	this.building = null;

	this.joins = [];

	this.addToScene = function(scene) {
		var geometry = new THREE.CubeGeometry(50, 50, 50, 1, 1, 1);
		material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
		this.building = new THREE.Mesh( geometry, material );

		this.building.position = this.node.normal.clone().multiplyScalar(20);
		this.building.position.addSelf(this.node.position);

		this.building.lookAt(this.building.position.clone().addSelf(this.node.normal));

		scene.add(this.building);
	};

	this.removeFromScene = function(scene) {
		scene.removeFromScene(building);
		delete this.building;
		this.building=null;
		for(i=0; i<this.joins.length; i++) {
			scene.removeFromScene(this.joins[i]);
			delete this.joins[i];
		}
		this.joins = [];
	}

	this.addNeighbour = function(neighbour, scene) {
		if(neighbour.unit!=null && neighbour.unit.constructor == GLOBE.FactoryUnit) {
			var midpoint = this.node.position.clone().addSelf(neighbour.position).multiplyScalar(0.5);
			var avgnormal = this.node.normal.clone().addSelf(neighbour.normal);
			var offset = avgnormal.multiplyScalar(40).addSelf(midpoint);
			var joinCurve = new THREE.QuadraticBezierCurve3(this.node.position, offset, neighbour.position)
			var joinGeom = new THREE.Geometry();
			joinGeom.vertices = joinCurve.getSpacedPoints(8).map(function(value) { return new THREE.Vertex(value); });
			var joinMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00  });
			var join = new THREE.Line( joinGeom, joinMaterial, THREE.LineStrip);

			this.joins.push(join);
			scene.add(join);
		}
	};
};

GLOBE.Unit.prototype.clone = function() {
	return new GLOBE.FactoryUnit();
};

GLOBE.FactoryUnit.prototype = new GLOBE.Unit();
GLOBE.FactoryUnit.prototype.constructor = GLOBE.FactoryUnit;