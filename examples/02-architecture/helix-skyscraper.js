rule("floor", function () {
    const factor = rand.between(0.9, 1.1);

    this.repeat(rand.between(3, 20), {
        y: 1.2,
        ry: rand.between(1, 5),
        sx: factor,
        sz: factor,
        lightness: 1 / factor,
    }, function () {
        this.box({ sx: 10, sz: 10 });
    }, "floor");
}).maxDepth(5);

start(function () {
    this.call("floor", { s: 0.5, color: "orange" });
}, () => {
    viewer.focusCamera();
});
