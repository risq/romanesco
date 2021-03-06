rule("spiral", function () {
    this.box();
    this.call("spiral", {
        y: 1.5,
        s: 0.95,
        rx: 10,
        hue: 2,
    });
}).maxDepth(50, "spiral2"); // When max depth has been reached, call "spiral2"

rule("spiral2", function () {
    this.box();
    this.call("spiral2", {
        y: 1.5,
        s: 1.05,
        rx: -10,
        hue: 2,
    });
}).maxDepth(50);

start(function () {
    this.call("spiral", { color: "red" });
});
