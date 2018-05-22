const transform = { y: 1.5, rx: -5, s: 1.2 };

def("box", function () {
    this.box();
    this.call("box", transform);
}).maxDepth(6);

def("sphere", function () {
    this.sphere();
    this.call("sphere", transform);
}).maxDepth(6);

def("plane", function () {
    this.plane();
    this.call("plane", transform);
}).maxDepth(6);

def("cone", function () {
    this.cone();
    this.call("cone", transform);
}).maxDepth(6);

def("cylinder", function () {
    this.cylinder();
    this.call("cylinder", transform);
}).maxDepth(6);

def("circle", function () {
    this.circle();
    this.call("circle", transform);
}).maxDepth(6);

def("torus", function () {
    this.torus();
    this.call("torus", transform);
}).maxDepth(6);

def("tetrahedron", function () {
    this.tetrahedron();
    this.call("tetrahedron", transform);
}).maxDepth(6);

def("octahedron", function () {
    this.octahedron();
    this.call("octahedron", transform);
}).maxDepth(6);

def("icosahedron", function () {
    this.icosahedron();
    this.call("icosahedron", transform);
}).maxDepth(6);

def("dodecahedron", function () {
    this.dodecahedron();
    this.call("dodecahedron", transform);
}).maxDepth(6);

def("extrudedShape", function () {
    const shape = new Shape();
    shape.lineTo(-0.5, 1);
    shape.lineTo(0.5, 1);

    this.createExtrudeMesh(null, { shape });
    this.call("extrudedShape", transform);
}).maxDepth(6);

def("lathe", function () {
    this.createLatheMesh(null, {
        points: [
            new Vector2(0, -0.5),
            new Vector2(0.125, -0.25),
            new Vector2(0.25, 0),
            new Vector2(0.5, 0.25),
            new Vector2(1, 0.5),
        ],
    });
    this.call("lathe", transform);
}).maxDepth(6);

def("parametric", function () {
    this.createParametricMesh(null, {
        func: (u, t, target) => {
            const v = 2 * Math.PI * t;

            return target.set(
                Math.cos(v) * (0.5 + (u - 0.5) * Math.cos(v / 2)),
                Math.sin(v) * (0.5 + (u - 0.5) * Math.cos(v / 2)),
                (u - 0.5) * Math.sin(v / 2)
            );
        },
    });
    this.call("parametric", transform);
}).maxDepth(6);

start(function () {
    this.call("box", { x: -15 });
    this.call("sphere", { x: -12 });
    this.call("plane", { x: -9 });
    this.call("cone", { x: -6 });
    this.call("cylinder", { x: -3 });
    this.call("circle", { x: 0 });
    this.call("torus", { x: 3 });
    this.call("tetrahedron", { x: 6 });
    this.call("octahedron", { x: 9 });
    this.call("icosahedron", { x: 12 });
    this.call("dodecahedron", { x: 15 });
    this.call("extrudedShape", { x: 18 });
    this.call("lathe", { x: 21 });
    this.call("parametric", { x: 24 });
});
