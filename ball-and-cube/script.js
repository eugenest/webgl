$(document).ready(function(){
    
    var stats = initStats();
    var controls = initControls();
    
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
    var axes = new THREE.AxisHelper( 20 );
    scene.add(axes);
    
    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);
    
    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: false});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    
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
    
    var step=0;
    function renderScene() {
        step+=0.04;
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        spotLight.position.x += controls.sunPositionX;
        spotLight.position.y += controls.sunPositionY;
        spotLight.position.z += controls.sunPositionZ;
        
        sphere.position.x = 20+( controls.bouncingAmp*(Math.cos(step)));
        sphere.position.y = 2 +( controls.bouncingAmp*Math.abs(Math.sin(step)));
        
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
        stats.update();
    }
    
    function initControls(){
        var controls = new function(){
            this.rotationSpeed = 0.1;
            this.bouncingAmp = 10;
            this.sunPositionX = 0;
            this.sunPositionY = 0;
            this.sunPositionZ = 0;
        };
        var gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 1);
        gui.add(controls, 'bouncingAmp', 10, 20);
        gui.add(controls, 'sunPositionX', -1,1);
        gui.add(controls, 'sunPositionY', -1,1);
        gui.add(controls, 'sunPositionZ', -1,1);
        return controls;
    }
}); 
    