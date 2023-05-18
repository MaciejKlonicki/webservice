import React from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { withTranslation } from 'react-i18next';

function Body({ t }) {

        const history = useHistory();
    
        const routeChange = () =>{ 
            let path = `settings`; 
            history.push(path);
            window.location.reload(true);
          }

        return (
            <div style={{position: "absolute", height: "90.5%", marginTop: "15px", paddingRight: "15px" ,borderRight: "1.8px solid #444444"}}>
                <button style={{marginLeft: "20px", marginTop: "20px", width: "150px"}} type="button" className="btn btn-primary">{t('CreatePost.1')}</button>
                <Dropdown>
                    <Dropdown.Toggle style={{position: "fixed", left: "20px", top: "160px", width: "150px"}} className="btn btn-primary" id="dropdown-basic">
                    {t('Sort.1')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('CreationDate.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Popularity.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Stars.1')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle style={{position: "fixed", left: "20px", top: "225px", width: "150px"}} className="btn btn-primary" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('Sport.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Education.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Music.1')}</Dropdown.Item>
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
export default withTranslation()(Body);