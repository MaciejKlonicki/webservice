import React from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Body()  {

        const history = useHistory();

        const routeChange = () =>{ 
            let path = `settings`; 
            history.push(path);
            window.location.reload(true);
          }

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
                <Dropdown>
                    <Dropdown.Toggle style={{position: "fixed", left: "20px", top: "225px", width: "150px"}} className="btn btn-primary" id="dropdown-basic">
                        Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Sport</Dropdown.Item>
                        <Dropdown.Item>Education</Dropdown.Item>
                        <Dropdown.Item>Music</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input style={{position: "fixed", top: "290px", width: "150px", left: "20px"}} type="search" className='form-control rounded' placeholder="Search" />
                <Card onClick={routeChange} style={{ width: '18rem', position: "fixed", left: "250px", top: "100px", backgroundColor: "#1f2124", cursor: "pointer"}}>
                    <Card.Img variant="top" src="images/man.png"/>
                <Card.Body>
                    <Card.Title  style={{color: "white"}}>First post of mine!</Card.Title>
                <Card.Text style={{color: "white"}}>
                    Hello! This is my first post!
                </Card.Text>
                </Card.Body>
                </Card>
            </div>
        );
    }

export default Body;