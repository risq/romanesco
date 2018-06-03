rule("spiral", function () {
    this.box();
    this.call("spiral", { y: 1.5, s: 0.95, rx: 10 });

    // 10% of the time, create a new branch
    if (this.rand.oneIn(10)) {
        this.call("spiral", {
            y: 1.5,
            s: 0.95,
            rx: 10,
            ry: 90,
            hue: 15, // Increase hue when branching
        });
    }
}).maxDepth(100);

start(function () {
    this.call("spiral", { color: this.rand.color({ lightness: 0.5 }) });
});
