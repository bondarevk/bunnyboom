import * as THREE from 'three';

class RenderUtils {
  static createBox(x=0, y=0, z=0, width=1, height=1, depth=1, color=0xFFFFFF, castShadow=false, receiveShadow=false) {
    let material = new THREE.MeshPhongMaterial({color});
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