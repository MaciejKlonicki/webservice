import { withTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom"
import { useEffect, useState } from 'react'
import RatingBox from './RatingBox'

const EditPostRating = ({ match, t }) => {

    const history = useHistory()
    const [userRating, setUserRating] = useState(0)
    const userEmail = localStorage.getItem("email")
    const postId = match.params.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ratingResponse = await fetch(`http://localhost:8080/api/v1/post-ratings/get-rating?userEmail=${userEmail}&postId=${postId}`)
                const ratingData = await ratingResponse.json()
                setUserRating(ratingData.rating || 0)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [postId, userEmail])

    const handleChangePostRating = (newRating) => {
        fetch(`http://localhost:8080/api/v1/post-ratings/edit-rating`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                userEmail,
                postId,
                newRating: newRating
            })
        })
            .then((response) => response.json())
            .then(() => {
                setUserRating(newRating)
            })
            .catch((error) => console.error('Error:', error))
    }

    const cancel = () => {
        history.push(`/posts/${postId}`)
        window.location.reload(true)
    }

    return (
        <div style={{ maxWidth: "1300px", margin: "100px auto", textAlign: "center" }}>
            <h1 style={{ color: "white", marginTop: "10px", marginBottom: "20px" }}>{t('EditPostRating.1')}</h1>
            <RatingBox
                value={userRating}
                onChange={(event, rating) => {
                    handleChangePostRating(rating);
                    setUserRating(rating);
                }}
                t={t}
                customStyle={{ marginRight: '0px' }}
            />
            <button
                onClick={cancel}
                className="btn btn-secondary"
                style={{
                    border: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    margin: "5px auto",
                    display: "block",
                    marginBottom: '15px'
                }}
            >
                {t('Back.1')}
            </button>
        </div>
    )
}

export default withTranslation()(EditPostRating)