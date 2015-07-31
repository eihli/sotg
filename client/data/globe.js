var container, controls;
    var camera, scene, renderer;
    var group;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    // var data = [-7.18, 37.3];
    var data = getLocation();
    data = data.slice(-500);
    var animateId;
var init = function () {
        container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 500;
        scene = new THREE.Scene();
        group = new THREE.Group();
        scene.add( group );

        controls = new THREE.OrbitControls( camera );
        
        controls.damping = 0.2;
        controls.addEventListener( 'change', render );
        
        var loader = new THREE.TextureLoader();
        loader.load( '../assets/land_ocean_ice_cloud_2048.jpg', function ( texture ) {
          var geometry = new THREE.SphereGeometry( 200, 35, 35 );
          var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
          var mesh = new THREE.Mesh( geometry, material );
          group.add( mesh );
        } );

        var canvas = document.createElement( 'canvas' );
        canvas.width = 128;
        canvas.height = 128;
        var context = canvas.getContext( '2d' );
        var gradient = context.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );
        gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
        gradient.addColorStop( 1, 'rgba(255,255,255,1)' );
        context.fillStyle = gradient;
        context.fillRect( 0, 0, canvas.width, canvas.height );
        var texture = new THREE.Texture( canvas );
        texture.needsUpdate = true;
        var geometry = new THREE.PlaneBufferGeometry( 300, 300, 3, 3 );
        var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = - 250;
        mesh.rotation.x = - Math.PI / 2;
        group.add( mesh );
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor( 0xffffff );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
};

var onWindowResize = function () {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

var animate = function () {
  animateId = requestAnimationFrame( animate );
  render();
  controls.update();
};

var render = function () {
  camera.lookAt( scene.position );
  // group.rotation.y -= 0.005;
  renderer.render( scene, camera );

};

var latLongToVector3 = function (lat, lon, radius, height) {
        var phi = (lat)*Math.PI/180;
        var theta = (lon-180)*Math.PI/180;
 
        var x = -(radius+height) * Math.cos(phi) * Math.cos(theta);
        var y = (radius+height) * Math.sin(phi);
        var z = (radius+height) * Math.cos(phi) * Math.sin(theta);
 
        return new THREE.Vector3(x,y,z);
};

var addDensity = function (data) { 
        // the geometry that will contain all our cubes
        var geom = new THREE.Geometry();
        // material to use for each of our elements. Could use a set of materials to
        // add colors relative to the density. Not done here.
        // var sphereMat = new THREE.MeshBasicMaterial({color: 0x660000});
        var BoxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
        for (var i = 0 ; i < data.length- 1; i++) {
 
            // calculate the position where we need to start the sphere
            var position = latLongToVector3(data[i][0], data[i][1], 200, 1);
            // create the sphere
            var box = new THREE.Mesh(BoxGeometry);
            // position the box correctly
            box.lookAt( new THREE.Vector3(0,0,0) );
            box.position.x = position.x;
            box.position.y = position.y;
            box.position.z = position.z;
            // scene.add(box);
            box.updateMatrix();
            geom.merge( box.geometry, box.matrix ); 
            // // merge with main model
            // THREE.GeometryUtils.merge(geom,sphere);
        }
        // create a new mesh, containing all the other meshes.
        var total = new THREE.Mesh(geom,new THREE.MeshBasicMaterial({
          color: 0xff0000,
          morphTargets: true
        }));
 
        // and add the total mesh to the scene
        scene.add(total);
};

init();
animate();
addDensity(data);
