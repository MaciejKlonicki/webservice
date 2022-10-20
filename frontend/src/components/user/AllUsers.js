import React, { Component } from 'react'

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

    render() {
        return (
            <div>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">View</button>
                                             </td>
                                        </tr>
                                    )
                                }

                 </div>
        )
    }
}

export default NavigationBar