import React from 'react';
import '../_styles.scss';

const Homepage = ({ setPageTitle, currentPageTitle }) => {

    const handleNavClick = (title) => {
        setPageTitle(title);
    };

    return (
        <>
            <header className="navbar">
                <img src='/images/1.jpg' alt="Logo" className="logo" />
                <h1 className="title">{currentPageTitle}</h1>

                <nav className="menu">
                    <div className="dropdown">
                        <button>| Settings |</button>
                        <div className="dropdown-content">
                            <button onClick={() => handleNavClick('Preprocessing Settings')}>Preprocessing Settings</button>
                            <button onClick={() => handleNavClick('Segmentation Settings')}>Segmentation Settings</button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button>| Files |</button>
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
                    <img src="/images/2.jpg" alt="Icon 2" className="sidebar-icon" />
                    <img src="/images/3.jpg" alt="Icon 3" className="sidebar-icon" />
                    <img src="/images/4.jpg" alt="Icon 4" className="sidebar-icon" />
                </div>
                <img className='p-3' style={{ maxHeight: "500px", }} src="/images/5.jpg" alt="" />
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
