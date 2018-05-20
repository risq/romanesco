def("myRule", function () {
  this.box();
  this.call("myRule", { y: 1.5, s: 0.95, rx: 10 })
}).maxDepth(100);

start(function() {
  this.call("myRule");
});
