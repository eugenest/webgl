function initStats(){
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
        
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
        
    document.body.appendChild( stats.domElement );
        
    return stats;
}