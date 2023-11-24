import { useHistory } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/")
        window.location.reload(true)
    }

    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found...</p>
            <div className="center-button">
                <button onClick={handleClick} to="/">Go back</button>
            </div>
        </div>
    );
}

export default NotFound;