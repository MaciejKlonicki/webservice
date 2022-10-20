import React, { Component } from 'react'
import UserService from './services/UserService';

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
    }

    viewUser(id){
      this.props.history.push(`/profile/${id}`);
      window.location.reload();
    }

    componentDidMount(){
      UserService.getUsers().then((res) => {
          this.setState({ users: res.data});
      });
  }

    render() {
        return (
            <div>
                 <h2 className="text-center">User List</h2>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> {user.username} </td>   
                                             <td> {user.email}</td>
                                             <td> {user.mobile}</td>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">View </button>
                                             </td>
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

export default NavigationBar