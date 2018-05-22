def("tree", function () {
    this.growMesh(shapes.circle());

    if (Math.random() > 0.8) {
        this.call("tree", { ry: rand.between(0, 360), s: 0.9 });
        this.call("tree", { y: 2, rz: 6, s: 0.99 });
    } else {
        this.call("tree", { y: 2, rz: 6, s: 0.91 });
    }
}).maxDepth(30, "leaf");

def("leaf", function () {
    this.box({ s: 3, color: 0x00ff00 });
    this.call("leaf", {
        y: rand.between(-1, 5),
        rx: 4,
        s: rand.between(0.9, 1.5),
    });
}).maxDepth(4);

def("pot", function () {
    const shape = rand.bool()
        ? shapes.circle(64, rand.between(0.5, 1), rand.between(0.5, 1))
        : shapes.square(rand.between(0.75, 2), rand.between(0.75, 2));

    const bottomRadius = rand.between(1, 5);
    const topRadius = rand.between(0, 2);
    const extrudeRadius = rand.between(0.5, 1);
    const height = rand.between(0.5, 5);
    const extrudeHeight = rand.between(0.5, 3);

    this.growMesh(shape, { s: bottomRadius });
    this.growMesh(shape, { y: height, s: bottomRadius + topRadius });
    this.growMesh(shape, {
        y: height * 1.05,
        s: bottomRadius + topRadius + extrudeRadius,
    });
    this.growMesh(shape, {
        y: height + extrudeHeight,
        s: bottomRadius + topRadius + extrudeRadius,
    });
    this.growMesh(shape, {
        y: height + extrudeHeight,
        s: bottomRadius + topRadius,
    });
    this.growMesh(shape, { y: height * 1.05, s: bottomRadius + topRadius });
    this.growMesh(shape, { s: bottomRadius });
});

def("plant", function () {
    this.call("pot", { color: 0xff6a00 });
    this.call("tree", { ry: rand.between(0, 360), color: 0x5c1d00 });
});

start(function () {
    this.call("plant", { y: -10 });
});
