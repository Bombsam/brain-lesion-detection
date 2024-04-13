import { useEffect, useState, Fragment } from 'react';
import '../_styles.scss';
import ThreeDModel from '../components/ThreeDModel';
import MRISliceViewer from '../components/MRISliceViewer';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import Tasks from '../components/Tasks';
import TasksContext from '../contexts/TasksContext ';

const Homepage = ({ setPageTitle, currentPageTitle }) => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({});
    const [open, setOpen] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [pagecontent, setPageContent] = useState(<></>);
    const [niftiDimensions, setNiftiDimensions] = useState({});
    const [currentStatus, setCurrentStatus] = useState("Waiting for MRI Image");

    // Fetch tasks from public/files directory on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/files/allFiles.json');
                if (response.ok) {
                    const files = await response.json();
                    const newTasks = files["data"]
                        .filter(file => file.endsWith('.obj')) // Filter only .obj files
                        .map(file => ({
                            id: file,
                            name: file,
                            href: `/files/${file}`, // Assuming files are accessible via /files/<filename>
                            imageSrc: 'your_image_source_url', // Set your image source URL here
                            imageAlt: file,
                            date: new Date().toLocaleDateString(), // Set current date as an example
                        }));
                    setTasks(newTasks);
                } else {
                    console.error('Failed to fetch tasks:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();

        // Clean up function to cancel fetch if component unmounts
        // return () => {
        //     // Your cleanup code here if needed
        // };
    }, []);

    useEffect(() => {
        if (tasks.length > 0 && Object.keys(currentTask).length === 0) {
            setCurrentTask(tasks[0]);
        }
    }, [tasks]); // Depend on tasks

    useEffect(() => {
        console.log({ currentTask })
        if (Object.keys(currentTask).length > 0)
            setPageContent(<ThreeDModel objPath={currentTask} />)
    }, [currentTask]); // Depend on tasks

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenUpload = () => {
        setOpenUpload(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseUpload = () => {
        setOpenUpload(false);
    };

    const handleNavClick = (title, content = (<></>)) => {
        setPageTitle(title);
        setPageContent(content);
    };

    const getDimensionsApiUrl = 'https://mglovvabftmddzfe6gm4htcmn40krqcg.lambda-url.ca-central-1.on.aws/get_dimensions';
    const fetchDimensions = async (requestData) => {
        try {
            const response = await axios.post(getDimensionsApiUrl, requestData);
            console.log(response.data["dimensions"]);
            const [x, y, z] = response.data["dimensions"];
            setNiftiDimensions({ x, y, z }); // Set as an object
        } catch (error) {
            console.error('Error fetching dimensions:', error);
        }
    };

    useEffect(() => {
        fetchDimensions(
            {
                "s3_key": "BraTS20_Training_030_t1.nii"
            }
        );
    }, []);

    const handleFileChange = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file.name);

            const formData = new FormData();
            formData.append("file", file);

            console.log('Attempting to upload file...');
            try {
                setCurrentStatus("Currently processing");
                const uploadResponse = await fetch('http://localhost:8000/upload', { // Call Python FastAPI
                    method: 'POST',
                    body: formData,
                });

                if (uploadResponse.ok) {
                    setCurrentStatus("Processing Successful, saving the processed data");

                    console.log('File upload successful, retrieving blob...');
                    const blob = await uploadResponse.blob();
                    console.log('Blob retrieved, preparing to re-upload...');

                    const newFormData = new FormData();
                    newFormData.append("file", blob, file.name + ".obj"); // Response we got from FastAPI

                    console.log('Attempting to save file on server...');
                    setCurrentStatus("Processing Finished")
                    const saveResponse = await fetch('http://localhost:3001/api/save', { // have the response saved to the public directory
                        method: 'POST',
                        body: newFormData
                    });

                    if (saveResponse.ok) {
                        console.log('File saved successfully to the server.');
                    } else {
                        console.error('Failed to save file on the server:', saveResponse.statusText);
                    }

                    const saveResponseJson = await saveResponse.json();
                    console.log({ savedFileName: saveResponseJson["filename"] })
                } else {
                    setCurrentStatus("Processing Failed, please retry");
                    setTimeout(setCurrentStatus("Waiting for MRI Image"), 5000)
                    console.error('Error in file processing:', uploadResponse.statusText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('No file selected.');
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, setTasks, setCurrentTask }}>
            <>
                <header className="navbar">
                    <img src='/images/logo.svg' alt="Logo" className="logo" onClick={() => handleNavClick('3D View', <ThreeDModel objPath={currentTask} />)} />
                    <h1 className="title">{currentPageTitle}</h1>

                    <nav className="menu">
                        <div className="dropdown">
                            <button>File</button>
                            <div className="dropdown-content">
                                <button onClick={() => handleClickOpen()}>Load MRI Image</button>
                                {/* <button onClick={() => handleNavClick('Save Image')}>Save Image</button> */}
                                <button onClick={() => handleNavClick('Save Segmented Image')}>Save Segmented Image</button>
                                <button onClick={() => handleNavClick('Export Lesion Template')}>Export Lesion Template</button>
                                {/* <button onClick={() => handleNavClick('Exit')}>Exit</button> */}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button>Settings</button>
                            <div className="dropdown-content">
                                <button onClick={() => handleNavClick('Preprocessing Settings')}>Preprocessing Settings</button>
                                <button onClick={() => handleNavClick('Segmentation Settings')}>Segmentation Settings</button>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className='d-flex h-100'>
                    <div className="sidebar">
                        <img src="/images/load.svg" alt="load" className="sidebar-icon" onClick={() => handleClickOpenUpload()} />
                        <img src="/images/tasks.svg" alt="tasks" className="sidebar-icon" onClick={() => handleNavClick("Tasks", <Tasks />)} />
                        <img src="/images/segmentation.svg" alt="segmentation" className="sidebar-icon" onClick={() => handleNavClick("MRI Slice Viewer", <MRISliceViewer niftiDimensions={niftiDimensions} />)} />
                    </div>

                    {pagecontent}

                </div>

                <footer className="footer">
                    <p className='m-0 me-4'>Status: {currentStatus}</p>
                    <p className='m-0 me-2'>Progress:</p>
                    <div className="progress-bar"></div>
                </footer>
                <Fragment>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth={true}
                        maxWidth={"md"}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Loading..."}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                    </Dialog>
                </Fragment>
                <Fragment>
                    <Dialog
                        open={openUpload}
                        onClose={handleCloseUpload}
                        fullWidth={true}
                        maxWidth="sm"
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Upload from your Computer"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Box sx={{ width: '100%', minHeight: "100px", textAlign: 'center' }}>
                                    <img src="/images/cloud-upload.png" alt="upload" style={{ margin: "0 auto" }} />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".nii.gz,.nii"
                                        style={{ display: 'block', margin: '20px auto' }}
                                    />
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Fragment>
            </>
        </TasksContext.Provider>

    );
};

export default Homepage;
