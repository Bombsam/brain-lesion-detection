import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Model = ({ objPath }) => {
    const obj = useLoader(OBJLoader, objPath);
    return <primitive object={obj} />;
};

const ThreeDModel = ({ objPath }) => {
    console.log({ objPath })
    return objPath ? (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Model objPath={objPath?.href} />
                <Environment preset="studio" background />
            </Suspense>
            <OrbitControls />
        </Canvas>
    ) : <>No 3D View available, please import/select an MRI Image to get started!</>;
};

export default ThreeDModel;