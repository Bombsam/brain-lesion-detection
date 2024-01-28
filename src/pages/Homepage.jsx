import '../_styles.scss';
// import ThreeDModel from '../components/ThreeDModel';
import MRISliceViewer from '../components/MRISliceViewer';

const Homepage = ({ setPageTitle, currentPageTitle }) => {

    const handleNavClick = (title) => {
        setPageTitle(title);
    };

    return (
        <>
            <header className="navbar">
                <img src='/images/logo.svg' alt="Logo" className="logo" />
                <h1 className="title">{currentPageTitle}</h1>

                <nav className="menu">
                    <div className="dropdown">
                        <button>Settings</button>
                        <div className="dropdown-content">
                            <button onClick={() => handleNavClick('Preprocessing Settings')}>Preprocessing Settings</button>
                            <button onClick={() => handleNavClick('Segmentation Settings')}>Segmentation Settings</button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button>Files</button>
                        <div className="dropdown-content">
                            <button onClick={() => handleNavClick('Load MRI Image')}>Load MRI Image</button>
                            <button onClick={() => handleNavClick('Save Image')}>Save Image</button>
                            <button onClick={() => handleNavClick('Save Segmented Image')}>Save Segmented Image</button>
                            <button onClick={() => handleNavClick('Export Lesion Template')}>Export Lesion Template</button>
                            <button onClick={() => handleNavClick('Exit')}>Exit</button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className='d-flex h-100'>
                <div className="sidebar">
                    <img src="/images/load.svg" alt="load" className="sidebar-icon" />
                    <img src="/images/tasks.svg" alt="tasks" className="sidebar-icon" />
                    <img src="/images/segmentation.svg" alt="segmentation" className="sidebar-icon" />
                </div>
                {/* <ThreeDModel objPath="/models/Brain_Model.obj" /> */}
                <MRISliceViewer niftiDimensions={{ x: 240, y: 240, z: 155 }} />
                <header className="App-header">
                </header>
                {/* <img className='p-3' style={{ maxHeight: "500px", }} src="/images/5.jpg" alt="" /> */}
            </div>
            <footer class="footer">
                <p className='m-0 me-4'>Status: Waiting for MRI Image</p>
                <p className='m-0 me-2'>Progress:</p>
                <div class="progress-bar"></div>
            </footer>
        </>
    );
};

export default Homepage;
