import * as THREE from 'three';

class RenderUtils {
  static createBox(x=0, y=0, z=0, width=1, height=1, depth=1, color=0x00FF00, castShadow=false, receiveShadow=false, base64=null, tX=3, tY=3) {

    let material;
    if (base64) {
      const image = new Image();
      image.src = base64;
      const texture = new THREE.Texture();
      texture.image = image;
      image.onload = () => {
        console.log('loaded');
        texture.needsUpdate = true;
      };
      texture.repeat.set(tX, tY);
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      material = new THREE.MeshPhongMaterial({color: color, map: texture});
    } else {
      material = new THREE.MeshPhongMaterial({color});
    }


    let mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;

    return mesh;
  }
}

export default RenderUtils;