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
            <p>{t('PageNotFound.1')}</p>
            <div className="center-button">
                <button onClick={handleClick} to="/">{t('Back.1')}</button>
            </div>
        </div>
    );
}

export default withTranslation()(NotFound)