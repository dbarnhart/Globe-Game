//= require Three
//= require Globe

GLOBE.ConnectivityModifier = function(radius) {
	this.radius = radius;
};

GLOBE.ConnectivityModifier.prototype.constructor = GLOBE.ConnectivityModifier;

GLOBE.ConnectivityModifier.prototype.modify = function(geometry) {
	var vertices = geometry.vertices;
	var faces = geometry.faces;
	var network = new Array(vertices.length);

	for (i=0; i<network.length; i++) {
		network[i] = { neighbours: [], normal:	new THREE.Vector3(), position: vertices[i].position };
	}
	
	for (i=0; i<faces.length; i++) {
		var face=faces[i];
		var vertexSet = null;
		if(face instanceof THREE.Face3) {
			vertexSet = [face.a, face.b, face.c];
		} else if(face instanceof THREE.Face4) {
			vertexSet = [face.a, face.b, face.c, face.d];
		}
		
		vertexSet.forEach(function(value, index) {
			var node=network[value];
			var nextVertex=vertexSet[(index+1) % vertexSet.length];

			if(node.neighbours.indexOf(nextVertex)==-1)
				node.neighbours.push(nextVertex);

			node.normal.addSelf(face.normal);
		});
	}

	for (i=0; i<network.length; i++) {
		network[i].normal.divideScalar(network[i].neighbours.length);
	}

	return network;
};