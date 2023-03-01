class MapsController {
    constructor() {
        window.addEventListener('mousemove', (e) => {
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse.clone(), camera );   
        
            var objects = raycaster.intersectObjects(scene.children);
            if (!objects || !objects[0] || objects[0].object.name !== "main_road") return;
        
            console.log("hovering over road");
            // mesh.position.copy(objects[0].point);
        });
    }    
}