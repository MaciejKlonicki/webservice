import React, { useState, useEffect } from 'react'
import { Dropdown, Card, Alert } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import { MdDeleteForever, MdModeEdit } from "react-icons/md"
import PostService from "../service/PostService"
import { Rating } from '@mui/material'

const Body = ({ t, isAdmin }) => {

    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [success, setSuccess] = useState(null)
    const [hoveredPostId, setHoveredPostId] = useState(null)
    const [hoveredIcon, setHoveredIcon] = useState(null)
    const [selectedType, setSelectedType] = useState('ALL')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [averageRatings, setAverageRatings] = useState({})
    const recordPerPage = 12
    const currentUsername = localStorage.getItem("username")
    const [sortDirection, setSortDirection] = useState('desc')

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
        await fetch(`http://localhost:8080/api/v1/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(() => {
            let updatePost = [...posts].filter(i => i.id !== id)
            setPosts(updatePost)
            setSuccess('You deleted post successfully!')
            setTimeout(() => {
                setSuccess(null)
            }, 2000)
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
            let response
            if (sortDirection === 'desc') {
                response = await PostService.getPostsOrderedDescByCreationDateAndType(selectedType)
                setSortDirection('asc')
            } else {
                response = await PostService.getPostsOrderedAscByCreationDateAndType(selectedType)
                setSortDirection('desc')
            }
            setPosts(response.data)
        } catch (error) {
            console.error("Error sorting by creation date: ", error)
        }
    }

    const handleSortByPopularity = async () => {
        try {
            let response
            if (sortDirection === 'desc') {
                response = await PostService.getPostsOrderedDescByPopularityAndType(selectedType)
                setSortDirection('asc')
            } else {
                response = await PostService.getPostsOrderedAscByPopularityAndType(selectedType)
                setSortDirection('desc')
            }
            setPosts(response.data)
        } catch (error) {
            console.error("Error sorting by popularity: ", error)
        }
    }

    const handleSortByRating = async () => {
        try {
            let response
            if (sortDirection === 'desc') {
                response = await PostService.getPostsOrderedDescByRatingAndType(selectedType)
                setSortDirection('asc')
            } else {
                response = await PostService.getPostsOrderedAscByRatingAndType(selectedType)
                setSortDirection('desc')
            }
            setPosts(response.data)
        } catch (error) {
            console.error("Error sorting by rating: ", error)
        }
    }

    const incrementPopularity = async (postId) => {
        await PostService.incrementPopularity(postId)
        setCurrentPage(1)
    }

    const editPost = (id) => {
        let path = `/edit/${id}`
        history.push(path)
        window.location.reload(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            const postsResponse = await fetch(`http://localhost:8080/api/v1/posts?page=${currentPage - 1}&size=${recordPerPage}&type=${selectedType}&searchTerm=${searchTerm}`)
            const postsData = await postsResponse.json()
            setPosts(postsData.content)
            setTotalPages(postsData.totalPages)

            const averageRatingsData = {}
            for (const post of postsData.content) {
                const averageRatingResponse = await PostService.averageRating(post.id)
                averageRatingsData[post.id] = averageRatingResponse.data
            }
            setAverageRatings(averageRatingsData)
        }

        fetchData()
    }, [currentPage, selectedType, searchTerm])

    const showNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
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
                        <Dropdown.Item onClick={handleSortByCreationDate}>
                            {t('CreationDate.1')}
                            {sortDirection === 'desc' ? ' ↓' : ' ↑'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleSortByPopularity}>
                            {t('Popularity.1')}
                            {sortDirection === 'desc' ? ' ↓' : ' ↑'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleSortByRating}>
                            {t('Stars.1')}
                            {sortDirection === 'desc' ? ' ↓' : ' ↑'}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle style={{ position: "fixed", left: "20px", top: "225px", width: "150px" }} className="btn btn-primary" id="dropdown-basic">
                        {t('Type.1')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSelectedType('ALL')}>{t('All.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('SPORT')}>{t('Sport.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('EDUCATION')}>{t('Education.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('MUSIC')}>{t('Music.1')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedType('OTHER')}>{t('Other.1')}</Dropdown.Item>
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
                {success && <Alert variant='success' style={{ textAlign: 'center' }}>{success}</Alert>}
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
                                width: '20rem',
                                margin: '10px',
                                marginLeft: '80px',
                                marginTop: '55px',
                                left: '200px',
                                backgroundColor: '#1f2124',
                                cursor: 'pointer',
                            }}>
                            <Card.Body
                                onMouseEnter={() => handleMouseEnter(post.id)}
                                onMouseLeave={handleMouseLeave}
                                style={{ marginRight: '5px' }}
                            >
                                {post.photo && <img style={{ width: '290px', height: '250px', borderRadius: '5px', marginBottom: '10px' }} src={`data:image/png;base64,${post.photo}`} alt="Post" />}
                                <Card.Title style={{ color: 'white', marginRight: '11px' }}>
                                    {post.title}
                                    {(isAdmin || (hoveredPostId === post.id && currentUsername === post.author)) && (
                                        <>
                                            <MdDeleteForever
                                                onMouseEnter={() => setHoveredIcon('delete')}
                                                onMouseLeave={() => setHoveredIcon(null)}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    remove(post.id)
                                                }}
                                                style={{ position: 'absolute', right: 5, color: isAdmin ? 'white' : (hoveredIcon === 'delete' ? 'white' : 'gray') }}
                                            />
                                            <MdModeEdit
                                                onMouseEnter={() => setHoveredIcon('edit')}
                                                onMouseLeave={() => setHoveredIcon(null)}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    editPost(post.id)
                                                }}
                                                style={{ position: 'absolute', right: 25, color: isAdmin ? 'white' : (hoveredIcon === 'edit' ? 'white' : 'gray') }}
                                            />
                                        </>
                                    )}
                                </Card.Title>
                                <Card.Text style={{ color: 'white' }}>
                                    {t('Written.1')} <b>{post.author}</b> {t('On.1')} {new Date(post.creationDate).toLocaleDateString()}
                                </Card.Text>
                                <div style={{ display: 'inline-flex' }}>
                                    <p style={{ color: 'white' }}>{t('Views.1')}<b>{post.popularity}</b></p>
                                    <p style={{ color: 'white', marginLeft: '140px' }}>{t('Ratings.1')}<b>{post.totalRatings}</b></p>
                                </div>
                                <Rating
                                    name={`average-rating-${post.id}`}
                                    value={averageRatings[post.id] || 0}
                                    precision={0.5}
                                    readOnly
                                    style={{ marginLeft: '75px' }}
                                />
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