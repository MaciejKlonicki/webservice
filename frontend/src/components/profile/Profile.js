import React from 'react';
import './Profile.css';

class Profile extends React.Component {

    render() {
    return (
    <div>
        <div className='profile_img text-center p-4'>
            <div className='flex flex-column justify-content-center align-items-center'>
                <img alt='profileImage'
                    style={{
                        position: "relative",
                        right: "750px",
                        top: "30px",
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%", 
                        objectFit: "cover",
                        border: "4px solid gray"
                        }}
                        src = "./images/man.png" />
                        <p style={{
                            position: "relative",
                            top: "50px",
                            right: "740px",
                            color: 'white'
                        }}></p>
            </div>
        </div>
    </div>
  )
}
}

export default Profile