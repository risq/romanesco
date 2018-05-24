rule("spiral", function () {
    // Create a box
    this.box();

    // Recursively call "spiral" rule
    this.call("spiral", { y: 1.5, s: 0.95, rx: 10 });
}).maxDepth(100);

start(function () {
    this.call("spiral");
});
