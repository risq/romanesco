import * as THREE from "three";
import OrbitControls from "three-orbit-controls";

THREE.OrbitControls = OrbitControls(THREE);

export default class Viewer {
  constructor() {
    this.mouseIsDown = false;
    this.needsUpdate = true;

    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100000000
    );

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    this.container = new THREE.Object3D();
    this.scene.add(this.container);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.domElement = this.renderer.domElement;
    document.body.appendChild(this.domElement);

    this.camera.position.set(-20, 15, 20);
    this.camera.lookAt(new THREE.Vector3());

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    // controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;

    this.bindEvents();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.needsUpdate) {
      this.needsUpdate = false;

      this.controls.update();
      this.render();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addMesh(mesh) {
    this.container.add(mesh);
  }

  bindEvents() {
    this.domElement.addEventListener(
      "mousedown",
      () => {
        this.mouseIsDown = true;
      },
      false
    );
    this.domElement.addEventListener(
      "mouseup",
      () => {
        this.mouseIsDown = false;
      },
      false
    );
    this.domElement.addEventListener(
      "mousemove",
      () => {
        if (this.mouseIsDown) {
          this.needsUpdate = true;
        }
      },
      false
    );
    this.domElement.addEventListener(
      "wheel",
      () => {
        this.needsUpdate = true;
      },
      false
    );
    this.domElement.addEventListener(
      "touchmove",
      () => {
        this.needsUpdate = true;
      },
      false
    );
  }

  focusCamera() {
    const boundingBox = new THREE.Box3().setFromObject(this.container);
    const boundingSphere = new THREE.Sphere();
    boundingBox.getBoundingSphere(boundingSphere);

    const objectAngularSize = (this.camera.fov * Math.PI / 180) * 1.3;
    const distanceToCamera = boundingSphere.radius / Math.tan(objectAngularSize / 2);
    const distanceToCamera2 = distanceToCamera * distanceToCamera;
    const len = Math.sqrt(distanceToCamera2 + distanceToCamera2);

    this.camera.position.set(len, len, len);

    this.camera.lookAt(boundingSphere.center);
    this.controls.target.set(
      boundingSphere.center.x,
      boundingSphere.center.y,
      boundingSphere.center.z
    );

    this.camera.updateProjectionMatrix();

    this.needsUpdate = true;
  }

  resize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
