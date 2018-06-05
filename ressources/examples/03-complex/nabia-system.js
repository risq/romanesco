// Port of Mikael Hvidtfeldt Christensen's Nabia System from Structure Synth
// Original post: https://www.flickr.com/photos/syntopia/3401189363

system.maxDepth = 30;

rule("r1", function () {
    this.call("dbox");
    this.call("r1", { z: 0.6, rx: 5 }, { resetSeed: true });
});

rule("r1", function () {
    this.call("dbox");
    this.call("r1", { z: 0.5, rx: -90 });
});

rule("r1", function () {
    this.call("dbox");
    this.call("r1", { z: 0.6, rz: 90 });
});

rule("r1", function () {
    this.call("dbox");
    this.call("r1", { z: 0.6, rz: -90 });
});

rule("r1", () => {}, 0.01);

rule(
    "dbox",
    function () {
        this.box({
            color: this.rand.color(),
            sx: 2,
            sy: 2,
            sz: 0.5,
        });
    },
    1
);

rule(
    "dbox",
    function () {
        this.call("r1", { ry: 90, sx: 0.5 });
    },
    0.5
);

rule(
    "dbox",
    function () {
        this.call("r1", { rx: 90, sx: 0.5, sy: 2 });
    },
    0.5
);

start(
    function () {
        this.call("r1", { ry: -90, lightness: 0.2 });
    },
    () => viewer.focusCamera()
);
