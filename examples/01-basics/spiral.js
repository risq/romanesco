def("spiral", function () {
  this.box();
  this.call("spiral", { y: 1.5, s: 0.95, rx: 10 });
}).maxDepth(100);

start(function () {
  this.call("spiral");
});
