import { useHistory } from "react-router-dom";
import './NotFound.css'
import { withTranslation } from 'react-i18next'

const NotFound = ({ t }) => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/")
        window.location.reload(true)
    }

    return (
        <div className="not-found">
            <h2>{t('Sorry.1')}</h2>
            <p>That page cannot be found...</p>
            <div className="center-button">
                <button onClick={handleClick} to="/">Go back</button>
            </div>
        </div>
    );
}

export default withTranslation()(NotFound)