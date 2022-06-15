import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Box2, Vector3 } from 'three'

const cursorSt = document.querySelector('.cursor')
const gltfLoader = new GLTFLoader()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// material

const material = new THREE.MeshStandardMaterial({
})




/**
 * Objects
 */
const objectsDistance = 4

let satellite = new THREE.Object3D
gltfLoader.load(
    'borisSatellite.glb', (gltf) => {

        gltf.scene.traverse( (child) => {
            if (child.name === 'satellite' ) {
                satellite = child
                satellite.position.set(-2,- objectsDistance * 0 - 0.4 ,4)
                satellite.scale.set(0.03,0.03,0.03)
                satellite.children.forEach(child => {
                    child.material = material
                })
                scene.add(satellite)
            }
        })
    }
)

const satelliteSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.2,32,16),
    new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0
    })
)
satelliteSphere.position.set(-2,-0.4 ,1)
scene.add(satelliteSphere)

const sphere1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1,64,32),
    material
)

const sphere2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.6,32,16),
    material
)

const sphere3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1,64,32),
    material
)

const torusSphere3 = new THREE.Mesh(
    new THREE.TorusBufferGeometry(2, 0.5, 50, 200),
    material
)

/// clouds
gltfLoader.load(
    'clouds.glb', (gltf) => {
        gltf.scene.position.set(0, -objectsDistance * 5 ,2)
        gltf.scene.scale.set(0.3,0.3,0.3)
        gltf.scene.rotation.y = - Math.PI / 2
        gltf.scene.traverse( (child) => {
            child.material = material
        })
        gltf.scene.traverse( (child) => {
            if (child.name === 'cloud2' ) {
                child.position.y =  40
                child.position.x = -20
            }
        })
        scene.add(gltf.scene)
    }
)


// plane

let plane = new THREE.Object3D
gltfLoader.load(
    'plane.glb', (gltf) => {

        gltf.scene.traverse( (child) => {
            if (child.name === 'plane' ) {
                plane = child
                plane.position.set(-2,-10 ,-1)
                plane.scale.set(0.09,0.09,0.09)
                plane.rotation.z = Math.PI / 2
                gltf.scene.traverse( (child) => {
                    child.material = material
                })
                scene.add(plane)
            }
        })

    }
)



// raycasted plane for a plane

const planeMouseCoord = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10,8),
    new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0
    })
)
scene.add(planeMouseCoord)

planeMouseCoord.position.y = -11


//block 1 object positions


sphere1.position.set(3,0.5,0)

sphere2.position.y = - objectsDistance * 0 + 3
sphere3.position.y = - objectsDistance * 0 + 1.4
torusSphere3.position.y = - objectsDistance * 0 + 1.4

sphere2.position.x = 1.5
sphere3.position.x = -4
torusSphere3.position.x = -4

sphere2.position.z = -4
sphere3.position.z = -2
torusSphere3.position.z = -2

torusSphere3.rotation.x = Math.PI / 1.5

torusSphere3.scale.z = 0.01

scene.add(sphere1, sphere2, sphere3, torusSphere3)

const sectionMeshes = [sphere1]

//ground 
let sun = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,16,32),
    new THREE.MeshBasicMaterial({color: "#ffed90"})
)
scene.add(sun)
sun.position.set(-3,-23,-4)


let moon = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,16,32),
    new THREE.MeshBasicMaterial({color: "#fff"})
)
scene.add(moon)
moon.position.set(20,-23,-4)



let windows = new THREE.Object3D()
gltfLoader.load(
    'earth.glb', (gltf) => {
        gltf.scene.position.set(0, -objectsDistance * 5.5 ,1)
        gltf.scene.scale.set(0.3,0.3,0.3)
        gltf.scene.rotation.y = - Math.PI / 2
        gltf.scene.traverse( (child) => {
            child.material = material
        })
        const windows1 = gltf.scene.children.find((child) => {
            return child.name === 'windows'
        })
        windows1.material = new THREE.MeshBasicMaterial()
        windows1.children.forEach((child) => {
            child.material = new THREE.MeshBasicMaterial()
        })
        windows = windows1
        windows.visible = false
        scene.add(gltf.scene)
    }
)




//particles

const particlesGeometry = new THREE.BufferGeometry()
const particleCount = 400

const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: "#ffffff",
    sizeAttenuation: true,
    size: 0.003
})


const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
//lights

const rectAreaLight = new THREE.RectAreaLight('#ffffff', 1, 20,20)
rectAreaLight.position.set(-2,-20,0)
rectAreaLight.lookAt(new THREE.Vector3(0,-26,0))
scene.add(rectAreaLight)




const pointlight1 = new THREE.PointLight('#ffffff', 2, 30)
pointlight1.position.set(-10,1.5,10)
scene.add(pointlight1)


const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
scene.add(ambientLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
cameraGroup.add(camera)

// Controls
/* const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true */

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/* renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap */



const clock = new THREE.Clock()
let previousTime = 0

let scrollY = window.scrollY
let currentSection = 0 

/window.addEventListener('scroll', () => {
    scrollY = window.scrollY

}) 


//raycaster

const raycaster = new THREE.Raycaster()
let currentIntersect = null

window.addEventListener('click', () => {
    if(currentIntersect) {
        satelliteDir.x = (Math.random() - 0.5) * 0.01,
        satelliteDir.y = (Math.random() - 0.5) * 0.01
        }
    }
) 

const mousePlane = new THREE.Vector2(-2,-10)
const raycaster_plane = new THREE.Raycaster()
let currentPlaneIntersect = null

window.addEventListener('click', () => {
    if(currentPlaneIntersect) {
        mousePlane.x = currentPlaneIntersect.point.x
        mousePlane.y = currentPlaneIntersect.point.y
    }
})

const raycaster_sun = new THREE.Raycaster()
let currentSunIntersect = null



window.addEventListener('click', () => {
    if(currentSunIntersect) {
            const tweenSun = new TWEEN.Tween(sun.position)
            .to(new THREE.Vector3(-14,-26,-4), 2000)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()

            //windows.visible = true
            setTimeout(function() { windows.visible = true; }, 1000);

            const tweenLight = new TWEEN.Tween(rectAreaLight.position)
            .to(new THREE.Vector3(-25,-32,-4), 2000)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()


            const tweenMoon = new TWEEN.Tween(moon.position)
            .to(new THREE.Vector3(-3,-23,-4), 2500)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()

        }
    }
) 
const raycaster_moon = new THREE.Raycaster()
let currentMoonIntersect = null

window.addEventListener('click', () => {
    if(currentMoonIntersect) {

            const tweenMoon = new TWEEN.Tween(moon.position)
            .to(new THREE.Vector3(20,-23,-4), 2000)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()

            setTimeout(function() { windows.visible = false; }, 1000);

            const tweenLight = new TWEEN.Tween(rectAreaLight.position)
            .to(new THREE.Vector3(-2,-20,0), 2000)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()

            const tweenSun = new TWEEN.Tween(sun.position)
            .to(new THREE.Vector3(-3,-23,-4), 2000)
            .easing(TWEEN.Easing.Quadratic.InOut )
            .start()
        }
    }
) 

//cursor

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;
    cursorSt.setAttribute('style', 'top: '+(e.pageY - 20)+'px; left: '+(e.pageX - 20)+'px')
})


const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = -(e.clientY / sizes.height * 2 - 1)
})

/**
 * Animate
 */
// for satellite
let satelliteDir = {
    x: 0.005,
    y: 0,
}
//

const animate = () =>
{
    TWEEN.update()

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    camera.position.y = - (scrollY * 1.5) / sizes.height * 4

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;


    if ((satelliteSphere.position.x > 2.8)||(satelliteSphere.position.x < -4)||(satelliteSphere.position.y > 2)||(satelliteSphere.position.y < -2)) {
        satelliteSphere.position.set(-3,-0.4 ,1)
        satelliteDir.x = 0.005
        satelliteDir.y = 0
    }

    satelliteSphere.position.x += satelliteDir.x
    satelliteSphere.position.y += satelliteDir.y
    satellite.rotation.y += 0.01 

    satellite.position.copy(satelliteSphere.position)

    //plane 
    
    let prevPosition = plane.position.clone();
    let nextPosition = prevPosition.clone();
    nextPosition.lerp(new THREE.Vector3(mousePlane.x, mousePlane.y, 0), 0.01);
    nextPosition.x += Math.cos(elapsedTime) * 0.03;
    nextPosition.y += Math.sin(elapsedTime) * 0.03;

    let prevRotation = plane.quaternion.clone();
    plane.lookAt(nextPosition);
    prevRotation.slerp(plane.quaternion, 0.1);
    plane.quaternion.copy(prevRotation);
    plane.position.copy( nextPosition );

    

    
    //raycaster

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects([satelliteSphere])
    
    if(intersects.length) {
        currentIntersect = intersects[0]
    }
    else {
        currentIntersect = null
    }


    raycaster_plane.setFromCamera(mouse, camera)

    let planeIntersects = raycaster_plane.intersectObjects([planeMouseCoord])

    if (planeIntersects.length) {
        currentPlaneIntersect = planeIntersects[0]
    }
    else {
        currentPlaneIntersect = null
    }

    raycaster_sun.setFromCamera(mouse, camera)

    let sunIntersects = raycaster_sun.intersectObjects([sun])

    if (sunIntersects.length) {
        currentSunIntersect = sunIntersects[0]
    }
    else {
        currentSunIntersect = null
    }


    raycaster_moon.setFromCamera(mouse, camera)

    let moonIntersects = raycaster_moon.intersectObjects([moon])

    if (moonIntersects.length) {
        currentMoonIntersect = moonIntersects[0]
    }
    else {
        currentMoonIntersect = null
    }
    //watermaterial

    //waterMaterial.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()
