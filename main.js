import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  this._OnWindowResize();
}, false);

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75, 20, 0);

const scene = new THREE.Scene();

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;

scene.add(light);

light = new THREE.AmbientLight(0x101010);
scene.add(light);

const controls = new OrbitControls(
  camera, renderer.domElement
);
controls.target.set(0, 20, 0);
controls.update();

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  './assets/negx.jpg',
  './assets/negy.jpg',
  './assets/negz.jpg',
  './assets/posx.jpg',
  './assets/posy.jpg',
  './assets/posz.jpg'
]);
scene.background = texture;
