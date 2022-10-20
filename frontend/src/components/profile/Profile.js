import React, {Component} from 'react';
import './Profile.css';
import UserService from '../services/UserService';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            users: {}
        }
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({ users: res.data });
        })
    }

    render() {
    return (
    <div>
        {/* <div className='profile_img text-center p-4'>
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
        </div> */}
        <div>
            <br></br>
            <div className='card col-md-6 offset-md-3'>
                <h3 className='text-center'>View User Details</h3>
                <div className='card-body'>
                    <div className='row'>
                        <label>User first name: </label>
                        <div>{ this.state.users.username }</div>
                        <div>{ this.state.users.email }</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
}

export default Profile;