import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75, 20, 0);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
// scene.add( directionalLight );
//
let light = new THREE.DirectionalLight(0xFFFFFF, 2.0);
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
scene.add( light );


// let light = new THREE.AmbientLight(0x101010);
// scene.add(light);

const controls = new OrbitControls(
  camera, renderer.domElement
);
controls.target.set(0, 20, 0);
controls.update();

const wolrdLoader = new THREE.CubeTextureLoader();
const texture = wolrdLoader.load([
  '/assets/posx.jpg',
  '/assets/negx.jpg',
  '/assets/posy.jpg',
  '/assets/negy.jpg',
  '/assets/posz.jpg',
  '/assets/negz.jpg'
]);
 scene.background = texture;

 //plane
const geometry = new THREE.PlaneGeometry(100, 100, 10, 10)
const material = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(geometry, material)
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

//3D model
const loader = new GLTFLoader();
loader.load('/assets/squid_game_soldier', (gltf) => {
  const mesh = gltf.scene.children[0]
  scene.add(mesh);
})

//cubes
// const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
// const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.position.set(0, 10, 0);
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

const song = new Audio('/assets/Closer.mp3');
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
}

animate();
