//= require Three
//= require Globe

GLOBE.SphericalModifier = function(radius) {
	this.radius = radius;
};

GLOBE.SphericalModifier.prototype.constructor = GLOBE.SphericalModifier;

GLOBE.SphericalModifier.prototype.modify = function(geometry) {
	var vertices = geometry.vertices;
	
	for (i=0; i<vertices.length; i++) {
		vertices[i].position.setLength(this.radius);
	}

	delete geometry.__tmpVertices;

	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
};