rule("tree", function () {
    this.growMesh(shapes.circle());

    if (this.rand.float() > 0.8) {
        this.call("tree", { ry: this.rand.between(0, 360), s: 0.9 });
        this.call("tree", { y: 2, rz: 6, s: 0.99 });
    } else {
        this.call("tree", { y: 2, rz: 6, s: 0.91 });
    }
}).maxDepth(30, "leaf");

rule("leaf", function () {
    this.box({ s: 3, color: 0x00ff00 });
    this.call("leaf", {
        y: this.rand.between(-1, 5),
        rx: 4,
        s: this.rand.between(0.9, 1.5),
    });
}).maxDepth(4);

rule("pot", function () {
    const shape = this.rand.bool()
        ? shapes.circle(64, this.rand.between(0.5, 1), this.rand.between(0.5, 1))
        : shapes.square(this.rand.between(0.75, 2), this.rand.between(0.75, 2));

    const bottomRadius = this.rand.between(1, 5);
    const topRadius = this.rand.between(0, 2);
    const extrudeRadius = this.rand.between(0.5, 1);
    const height = this.rand.between(0.5, 5);
    const extrudeHeight = this.rand.between(0.5, 3);

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

rule("plant", function () {
    this.call("pot", { color: 0xff6a00 });
    this.call("tree", { ry: this.rand.between(0, 360), color: 0x5c1d00 });
});

start(function () {
    this.call("plant", { y: -10 });
});
