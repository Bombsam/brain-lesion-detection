import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const MRISliceViewer = ({ niftiDimensions }) => {
    const [slices, setSlices] = useState({ x_slice: [], y_slice: [], z_slice: [] });
    const [coordinates, setCoordinates] = useState({
        x: Math.floor(niftiDimensions.x / 2),
        y: Math.floor(niftiDimensions.y / 2),
        z: Math.floor(niftiDimensions.z / 2)
    });
    const apiUrl = 'http://127.0.0.1:8000/get_slices/';

    const canvasRefX = useRef(null);
    const canvasRefY = useRef(null);
    const canvasRefZ = useRef(null);

    useEffect(() => {
        fetchSlices(coordinates);
    }, [coordinates]);

    const fetchSlices = async (coords) => {
        try {
            const response = await axios.post(apiUrl, coords);
            setSlices(response.data);
        } catch (error) {
            console.error('Error fetching slices:', error);
        }
    };

    useEffect(() => {
        drawSlice('x', slices.x_slice);
        drawSlice('y', slices.y_slice);
        drawSlice('z', slices.z_slice);
    }, [slices]);

    const drawSlice = (axis, sliceData) => {
        const canvas = axis === 'x' ? canvasRefX.current : axis === 'y' ? canvasRefY.current : canvasRefZ.current;
        if (canvas && sliceData.length) {
            const ctx = canvas.getContext('2d');
            const imageData = ctx.createImageData(sliceData[0].length, sliceData.length);
            sliceData.flat().forEach((value, index) => {
                imageData.data[index * 4] = value;
                imageData.data[index * 4 + 1] = value;
                imageData.data[index * 4 + 2] = value;
                imageData.data[index * 4 + 3] = 255;
            });
            ctx.putImageData(imageData, 0, 0);
        }
    };

    const handleMouseMove = (axis, event) => {
        const canvas = axis === 'x' ? canvasRefX.current : axis === 'y' ? canvasRefY.current : canvasRefZ.current;
        if (canvas) {
            console.log(event)
            const rect = canvas.getBoundingClientRect();
            const position = axis === 'x' ? event.clientX - rect.left : event.clientY - rect.top;
            const dimension = niftiDimensions[axis];
            const newValue = Math.min(Math.max(0, position), dimension - 1); // Ensure within bounds

            // ['x', 'y', 'z'].filter(a => a !== axis).forEach(a => {console.log(a)});
            // Update only the other two coordinates
            const newCoordinates = { ...coordinates, [axis]: Math.floor(newValue) };
            ['x', 'y', 'z'].filter(a => a !== axis).forEach(a => {
                setCoordinates(prev => ({ ...prev, [a]: newCoordinates[a] }));
            });
        }
    };

    return (
        <div>
            <h1>MRI Slice Viewer</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <canvas ref={canvasRefX} width={200} height={200} onMouseDown={(e) => handleMouseMove('x', e)} />
                <canvas ref={canvasRefY} width={200} height={200} onMouseDown={(e) => handleMouseMove('y', e)} />
                <canvas ref={canvasRefZ} width={200} height={200} onMouseDown={(e) => handleMouseMove('z', e)} />
            </div>
        </div>
    );
};

MRISliceViewer.propTypes = {
    niftiDimensions: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        z: PropTypes.number.isRequired
    }).isRequired
};

export default MRISliceViewer;