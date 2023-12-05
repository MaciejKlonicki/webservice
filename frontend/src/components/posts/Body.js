import React, { useState, useEffect } from 'react'
import { Dropdown, Card } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import { MdDeleteForever, MdModeEdit } from "react-icons/md"
import PostService from "../service/PostService"

function Body({ t }) {

    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [hoveredPostId, setHoveredPostId] = useState(null)
    const [hoveredIcon, setHoveredIcon] = useState(null)
    const [selectedType, setSelectedType] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const recordPerPage = 12

    const routeChange = (postId) => {
        let postDetails = `/posts/${postId}`
        history.push(postDetails)
        window.location.reload(true)
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
            let updatePost = [...posts].filter(i => i.id !== id)
            setPosts(updatePost)
        })
    }

    const handleMouseEnter = (postId) => {
        setHoveredPostId(postId)
    }

    const handleMouseLeave = () => {
        setHoveredPostId(null)
    }

    const handleSortByCreationDate = async () => {
        try {
            const response = await PostService.getPostsOrderedByCreationDateAndType(selectedType);
            setPosts(response.data);
        } catch (error) {
            console.error("Error sorting by creation date:", error);
        }
    };

    const handleSortByPopularity = async () => {
        try {
            const response = await PostService.getPostsOrderedByPopularityAndType(selectedType);
            setPosts(response.data);
        } catch (error) {
            console.error("Error sorting by popularity:", error);
        }
    };

    const incrementPopularity = async (postId) => {
        await PostService.incrementPopularity(postId)
        setCurrentPage(1)
    };

    const editPost = (id) => {
        let path = `/edit/${id}`
        history.push(path)
        window.location.reload(true)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/posts?page=${currentPage - 1}&size=${recordPerPage}&type=${selectedType}&searchTerm=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.content)
                setTotalPages(data.totalPages)
            })
    }, [currentPage, selectedType, searchTerm])

    const showNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            console.log("next")
        }
    }

    const showPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <div className='borderRightElement' style={{ position: "fixed", height: "90%", marginTop: "5px", paddingRight: "205px", borderRight: "1.8px solid #444444" }}>
                <button onClick={handleSubmit} style={{ position: "fixed", left: "20px", top: "100px", width: "150px" }} type="button" className="btn btn-primary">{t('CreatePost.1')}</button>
                <Dropdown>
                    <Dropdown.Toggle style={{ position: "fixed", left: "20px", top: "160px", width: "150px" }} className="btn btn-primary" id="dropdown-basic">
                        {t('Sort.1')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleSortByCreationDate}>{t('CreationDate.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={handleSortByPopularity}>{t('Popularity.1')}</Dropdown.Item>
                        <Dropdown.Item>{t('Stars.1')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle style={{ position: "fixed", left: "20px", top: "225px", width: "150px" }} className="btn btn-primary" id="dropdown-basic">
                        {t('Type.1')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSelectedType('All')}>{t('All.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('Sport')}>{t('Sport.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('Education')}>{t('Education.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('Music')}>{t('Music.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('Other')}>{t('Other.1')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input
                    style={{ position: 'fixed', top: '290px', width: '150px', left: '20px' }}
                    type="search"
                    className='form-control rounded'
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '25px' }}>
                {posts
                    .map((post) => (
                        <Card
                            key={post.id}
                            onClick={() => {
                                routeChange(post.id)
                                incrementPopularity(post.id)
                            }}
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
                                {post.photo && <img style={{ width: '250px', height: '250px', borderRadius: '5px', marginBottom: '10px', marginLeft: '3px' }} src={`data:image/png;base64,${post.photo}`} alt="Post" />}
                                <Card.Title style={{ color: 'white' }}>
                                    {post.title}
                                    {hoveredPostId === post.id && (
                                        <>
                                            <MdDeleteForever
                                                onMouseEnter={() => setHoveredIcon('delete')}
                                                onMouseLeave={() => setHoveredIcon(null)}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    remove(post.id)
                                                }}
                                                style={{ position: 'absolute', right: 5, color: hoveredIcon === 'delete' ? 'white' : 'gray' }} />
                                            <MdModeEdit
                                                onMouseEnter={() => setHoveredIcon('edit')}
                                                onMouseLeave={() => setHoveredIcon(null)}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    editPost(post.id)
                                                }}
                                                style={{ position: 'absolute', right: 25, color: hoveredIcon === 'edit' ? 'white' : 'gray' }} />
                                        </>
                                    )}
                                </Card.Title>
                                <Card.Text style={{ color: 'white' }}>
                                    {t('Written.1')} <b>{post.author}</b> {t('On.1')} {new Date(post.creationDate).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                <ul class="pagination" style={{ marginTop: '30px', position: "absolute", left: '300px' }}>
                    <li class="page-item">
                        <button
                            type="button"
                            class="page-link"
                            disabled={currentPage === 1 ? true : false}
                            onClick={showPrevPage}
                            className='btn btn-primary'
                            style={{ marginRight: '5px' }}
                        >
                            {t('Previous.1')}
                        </button>
                    </li>
                    <li class="page-item">
                        <button
                            type="button"
                            class="page-link"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={showNextPage}
                            className='btn btn-primary'
                        >
                            {t('Next.1')}
                        </button>
                    </li>
                </ul>
                <div style={{ fontFamily: 'monospace', color: 'white', position: "absolute", right: '140px', marginTop: '10px' }}>
                    {currentPage}/{totalPages}
                </div>
            </div>
        </>
    )
}
export default withTranslation()(Body)