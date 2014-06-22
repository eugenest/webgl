$(document).ready(function(){
    
    var stats = initStats();
    var controls = initControls();
    
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var cubeGeometry = new THREE.BoxGeometry(12,12,12);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);
    
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );
    
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    
    var webglOutput = document.getElementById('webgl-output');
    $("#webgl-output").append(renderer.domElement);
    renderScene();
    
    function renderScene() {
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
        cube.position.x = controls.positionX;
        stats.update();
    }
    
    function initControls(){
        var controls = new function(){
            this.positionX = 0;
        };
        var gui = new dat.GUI();
        gui.add(controls, 'positionX', -30, 30);
        return controls;
    }
});