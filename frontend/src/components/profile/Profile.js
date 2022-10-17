import React from 'react';
import './Profile.css';
import UserService from './UserService';

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        })
    }

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
        <div className='row'>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>username</th>
                    <th>email</th>
                    <th>mobile</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.users.map(
                        user => 
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
}

export default Profile