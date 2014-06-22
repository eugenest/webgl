$(document).ready(function(){
    
    initScene();
    renderScene();
    
    function initScene(){
        
        stats = initStats();
        controls = initControls();
        
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 0, 400);
        camera.lookAt(scene.position);
        
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        var cubeGeometry = new THREE.BoxGeometry(200, 200, 200);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 0, 0);
        scene.add(cube);
    
        var spotLight = new THREE.PointLight( 0xffffff );
    	spotLight.position = camera.position;
        spotLight.castShadow = true;
        scene.add( spotLight );
        
        var webglOutput = document.getElementById('webgl-output');
        $("#webgl-output").append(renderer.domElement);
        
        trackballControls = new THREE.TrackballControls( camera, renderer.domElement );
    	trackballControls.minDistance = 200;
    	trackballControls.maxDistance = 400;
    }
    
    function renderScene() {
        requestAnimationFrame(renderScene);
        cube.position.x = controls.positionX;
        renderer.render(scene, camera);
        trackballControls.update();
        stats.update();
    }
    
    function initControls(){
        var controls = new function(){
            this.positionX = 0;
        };
        var gui = new dat.GUI();
        gui.add(controls, 'positionX', -100, 100);
        
        return controls;
    }
});