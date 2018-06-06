rule("skyscraper", function () {
    this.call("floors", {
        s: 0.5,
        color: this.rand.color({ lightness: 0.5 }),
    });
});

rule("floors", function () {
    // Return a random value between -0.25 and 0.25,
    // using "inversed" triangular distribution
    const factor = this.rand.spreadTriangInv(0.25);

    // Repeat transform between 5 and 20 times
    this.repeat(
        this.rand.between(5, 20),
        {
            y: 1.2,
            ry: this.rand.between(1, 5),
            sx: 1 + factor,
            sz: 1 + factor,
            lightness: 1 - factor / 2, // soften the factor
        },
        function () {
            this.box({ sx: 25, sz: 25 });
        },
        // When done, recursively call "floors" rule again
        "floors"
    );
}).maxDepth(5);

start("skyscraper", () => viewer.focusCamera());
