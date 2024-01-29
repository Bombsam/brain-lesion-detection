import '../_styles.scss';
// import ThreeDModel from '../components/ThreeDModel';
import MRISliceViewer from '../components/MRISliceViewer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import * as React from 'react';
import Tasks from '../components/Tasks';

const Homepage = ({ setPageTitle, currentPageTitle }) => {

    const [open, setOpen] = React.useState(false);
    const [openUpload, setOpenUpload] = React.useState(false);
    const [pagecontent, setPageContent] = React.useState(<></>);

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

    return (
        <>
            <header className="navbar">
                <img src='/images/logo.svg' alt="Logo" className="logo" />
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
                    <img src="/images/segmentation.svg" alt="segmentation" className="sidebar-icon" onClick={() => handleNavClick("MRI Slice Viewer", <MRISliceViewer niftiDimensions={{ x: 240, y: 240, z: 155 }} />)} />
                </div>
                {/* <ThreeDModel objPath="/models/Brain_Model.obj" /> */}
                {pagecontent}

            </div>
            <footer class="footer">
                <p className='m-0 me-4'>Status: Waiting for MRI Image</p>
                <p className='m-0 me-2'>Progress:</p>
                <div class="progress-bar"></div>
            </footer>
            <React.Fragment>
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
            </React.Fragment>
            <React.Fragment>
                <Dialog
                    open={openUpload}
                    onClose={handleCloseUpload}
                    fullWidth={true}
                    maxWidth={"sm"}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Upload from your Computer"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Box sx={{ width: '100%', minHeight: "100px" }}>
                                <img src="/images/cloud-upload.png" alt="upload" style={{ margin: "0 auto" }} />
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
            </React.Fragment>
        </>
    );
};

export default Homepage;
