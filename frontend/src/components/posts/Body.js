import React from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

function Body({ t }) {

    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const routeChange = (postId) => {
        let postDetails = `/posts/${postId}`
        history.push(postDetails);
        window.location.reload(true);
    }

    const handleSubmit = () => {
        let createPost = `create-post`
        history.push(createPost)
        window.location.reload(true)
    }

    const remove = async (id) => {
        await fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatePost = [...posts].filter(i => i.id !== id);
            setPosts(updatePost);
        })
    }

    const handleMouseEnter = (postId) => {
        setHoveredPostId(postId);
    }

    const handleMouseLeave = () => {
        setHoveredPostId(null);
    }

    const editPost = (id) => {
        let path = `/edit/${id}`
        history.push(path)
        window.location.reload(true)
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <>
            <div style={{ position: "absolute", height: "90.5%", marginTop: "15px", paddingRight: "15px", borderRight: "1.8px solid #444444" }}>
                <button onClick={handleSubmit} style={{ marginLeft: "20px", marginTop: "20px", width: "150px" }} type="button" className="btn btn-primary">{t('CreatePost.1')}</button>
                <Dropdown>
                    <Dropdown.Toggle style={{ position: "fixed", left: "20px", top: "160px", width: "150px" }} className="btn btn-primary" id="dropdown-basic">
                        {t('Sort.1')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('CreationDate.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Popularity.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Stars.1')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle style={{ position: "fixed", left: "20px", top: "225px", width: "150px" }} className="btn btn-primary" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('Sport.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Education.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Music.1')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input style={{ position: "fixed", top: "290px", width: "150px", left: "20px" }} type="search" className='form-control rounded' placeholder="Search" />
            </div>
            <div>
                {posts.map((post) => (
                    <Card
                        key={post.id}
                        onClick={() => routeChange(post.id)}
                        style={{
                            display: 'inline-block',
                            width: '18rem',
                            margin: '10px',
                            marginLeft: '100px',
                            marginTop: '35px',
                            left: '200px',
                            backgroundColor: '#1f2124',
                            cursor: 'pointer',
                        }}>
                        <Card.Body
                            onMouseEnter={() => handleMouseEnter(post.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Card.Title style={{ color: 'white' }}>
                                {post.title}
                                {hoveredPostId === post.id && (
                                    <>
                                        <MdDeleteForever
                                            onMouseEnter={() => setHoveredIcon('delete')}
                                            onMouseLeave={() => setHoveredIcon(null)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                remove(post.id);
                                            }}
                                            style={{ position: 'absolute', right: 5, color: hoveredIcon === 'delete' ? 'white' : 'gray' }} />
                                        <MdModeEdit
                                            onMouseEnter={() => setHoveredIcon('edit')}
                                            onMouseLeave={() => setHoveredIcon(null)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editPost(post.id)
                                            }}
                                            style={{ position: 'absolute', right: 25, color: hoveredIcon === 'edit' ? 'white' : 'gray' }} />
                                    </>
                                )}
                            </Card.Title>
                            <Card.Text style={{ color: 'white' }}>Written by <b>{post.author}</b></Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}
export default withTranslation()(Body);