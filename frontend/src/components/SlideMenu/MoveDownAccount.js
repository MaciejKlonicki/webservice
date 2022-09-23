import React, {useState} from 'react';
import { Nav } from 'react-bootstrap';
import {Account} from './Account';
import './MoveDownAccounts.css';

function MoveDownAccount() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
    <>
        <ul
            onClick={handleClick}
            className={click ? 'movedown-menu-webservice clicked' : 'movedown-menu-webservice'}
            >
                {Account.map((item, index) => {
                    return (
                        <li key={index}>
                            <Nav.Link
                            href={item.path}
                            onClick={() => setClick(false)}
                            >
                                {item.title}
                            </Nav.Link>
                        </li>
                    )
                })}
            </ul>
    </>
  )
}
export default MoveDownAccount