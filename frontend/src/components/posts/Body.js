import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

class Body extends Component {
    render() {
        return (
            <div style={{position: "absolute", height: "90.5%", marginTop: "15px", paddingRight: "15px" ,borderRight: "1.8px solid #444444"}}>
                <button style={{marginLeft: "20px", marginTop: "20px", width: "150px"}} type="button" className="btn btn-primary">Create post</button>
                <Dropdown>
                    <Dropdown.Toggle style={{position: "fixed", left: "20px", top: "160px", width: "150px"}} className="btn btn-primary" id="dropdown-basic">
                        Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Data powstania</Dropdown.Item>
                        <Dropdown.Item>Popularność</Dropdown.Item>
                        <Dropdown.Item>Gwiazdy</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input style={{position: "fixed", top: "225px", width: "150px", left: "20px"}} type="search" className='form-control rounded' placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <Dropdown>
                    <Dropdown.Toggle style={{position: "fixed", left: "20px", top: "290px", width: "150px"}} className="btn btn-primary" id="dropdown-basic">
                        Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Sport</Dropdown.Item>
                        <Dropdown.Item>Education</Dropdown.Item>
                        <Dropdown.Item>Music</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default Body;