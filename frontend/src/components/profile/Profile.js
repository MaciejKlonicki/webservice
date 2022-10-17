import React, {useEffect, useState} from 'react';
import Avatar from 'react-avatar-edit';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import img from "./profile.png";
import './Profile.css';

const Profile = () => {
    const [imagecrop, setImagecrop] = useState(false)
    const [image, setImage] = useState("")
    const [src, setSrc] = useState(false)
    const [profile, setProfile] = useState([])
    const [pview, setPview] = useState(false)

    const profileFinal = profile.map((item) => item.pview);

    const onClose = () => {
        setPview(null);
    }

    const onCrop = (view) => {
        setPview(view);
    };

    const saveCropImage = () => {
        setProfile([...profile, {pview}]);
        setImagecrop(false);
    };
    
    useEffect(() => {
        const data = window.localStorage.getItem('saveImage');
        setPview(JSON.parse(data));
    })

    useEffect(() => {
        window.localStorage.setItem('saveImage', JSON.stringify(profileFinal))
    }, [profileFinal])

  return (
    <div>
        <div className='profile_img text-center p-4'>
            <div className='flex flex-column justify-content-center align-items-center'>
                <img
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
                        onClick={() => setImagecrop(true)}
                        src = {profileFinal.length ? profileFinal : img} alt="" /> 
    <Dialog style={{position: "relative", left: "20px"}}
        visible={imagecrop}
        onHide={() => setImagecrop(false)}>
    <Avatar
        width={350}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={src}/>
            
            <div className='flex flex-column align-items-center mt-5 w-12'>
                <div className='flex justify-content-around w-12 mt-4'>
                    <Button className='buttonProfile'
                    onClick={saveCropImage}
                    label="Save"
                    />
                </div>
            </div>
    </Dialog>
    <InputText 
    type="file"
    accept='image/*'
    style={{display: "none"}}
    onChange={(event) => {
        const file = event.target.files[0];
        if(file && file.type.substring(0, 5) === "image") {
            setImage(file);
        } else {
            setImage(null);
        }
    }}
    />
    </div>
    </div>
    </div>
  )
}

export default Profile