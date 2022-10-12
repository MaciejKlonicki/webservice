import React from 'react';
import Avatar from 'react-avatar-edit';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import img from "./profile.png";

const Profile = () => {
    const [imagecrop, setImagecrop] = useState("")
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

  return (
    <div>
    <div className='profile_img text-center p-4'>
    <div className='flex flex-column justify-content-center align-items-center'>

    <img
    style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%", 
        objectFit: "cover",
        border: "4px solid gray"
    }}
    onClick={() => setImagecrop(true)}
    src = {profileFinal.length ? profileFinal : img} alt="" />
    <label htmlFor='' className='mt-3 font-semibold text-5xl'>UZYTKOWNIK</label> 

    <Dialog
    visible={imagecrop}
        header={() => (
            <p htmlFor="" className='text-2xl font-semibold textColor'>
                Update Profile
            </p>
        )}
        onHide={() => setImagecrop(false)}
    >
    <div className='confirmation-content flex flex-column align-items-center'>
        <Avatar
            width={500}
            height={400}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            shadingColor={"#474649"}
            backgroundColor={"#474649"}
            />

            <div className='flex flex-column align-items-center mt-5 w-12'>
                <div className='flex justify-content-around w-12 mt-4'>
                    <Button
                    onClick={saveCropImage}
                    label="Save"
                    icon="pi pi-check"
                    />
                </div>
            </div>
    </div>
    </Dialog>
    <InputText 
    type="file"
    accept='/image/*'
    style={{display: "none"}}
    onChange={(event) => {
        const file = file.type.files[0];
        if(file && file.type.substring(0,5) === "image") {
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