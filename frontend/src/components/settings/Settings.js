import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import './Settings.css'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18next'
import { MdDone } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'

const Settings = ({ t }) => {

  const [change, setChange] = useState('')

  const handleClick = (lang) => {
    i18n.changeLanguage(lang)
  }

  const handel = () => {
    const element = (
      <Card bg="transparent" variant="dark" style={{ position: "absolute", marginLeft: "250px", marginTop: "50px", width: '500px', height: '500px', borderStyle: 'none' }}>
        <Card.Body style={{ color: "rgb(156, 156, 156)" }}>
          <Card.Title style={{ borderBottom: '0.5px solid rgba(255, 255, 255, 0.336)', paddingBottom: "10px", fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px' }}>{t('Choose.1')}</Card.Title>
          <Button onClick={() => handleClick('pl')} variant="secondary">Polski</Button>{' '}
          <Button onClick={() => handleClick('en')} variant="secondary">English</Button>
          <Button style={{ position: "relative", left: "245px" }} onClick={() => window.location.reload(false)} variant="info">{t('Refresh.1')}</Button>
        </Card.Body>
      </Card>
    )
    setChange(element)
  }

  const about = () => {
    const element = (
      <Card bg="transparent" variant="dark" style={{ position: 'absolute', marginLeft: "350px", marginTop: "25px", width: '500px', height: '500px', borderStyle: 'none' }}>
        <Card.Body style={{ color: "rgb(156, 156, 156)" }}>
          <Card.Title style={{ borderBottom: '0.5px solid rgba(255, 255, 255, 0.336)', paddingBottom: "10px", fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px' }}>{t('Informations.1')}</Card.Title>
          <h3 style={{ textAlign: "center" }}>{t('InformationTextHeader.1')}</h3>
          <p>{t('InformationText.1')}</p>
          <p style={{ textAlign: "center" }}><b>{t('InformationTextFunc.1')}</b></p>
          <p>{t('InformationTextToDoFirst.1')}{' '}<MdDone /></p>
          <p>{t('InformationTextToDoSecond.1')}{' '}<MdDone /></p>
          <p>{t('InformationTextToDoThird.1')}{' '}<MdDone /></p>
          <p>{t('InformationTextToDoFourth.1')}{' '}<AiOutlineClose /></p>
          <p>{t('InformationTextToDoFifth.1')}{' '}<AiOutlineClose /></p>
          <p>{t('InformationTextToDoSixth.1')}{' '}<AiOutlineClose /></p>
          <p>{t('InformationTextToDoSeventh.1')}{' '}<AiOutlineClose /></p>
          <p>{t('InformationTextToDoEigth.1')}{' '}<MdDone /></p>
          <p>{t('InformationTextToDoNineth.1')}{' '}<AiOutlineClose /></p>
          <Card.Footer style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.336)', paddingTop: "10px", fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px' }}>&copy; {new Date().getFullYear()}{t('Footer.1')}</Card.Footer>
        </Card.Body>
      </Card>
    )
    setChange(element)
  }

  return (
    <Card bg="dark" variant="dark" style={{ width: '250px', height: '93.7vh', borderRadius: "0px" }}>
      <Card.Body>
        <Card.Title style={{ color: "white", textTransform: "uppercase", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontWeight: "500", letterSpacing: "10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.25)" }}>{t('General.1')}</Card.Title>
        <ListGroup>
          <button onClick={handel} style={{ background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center" }} className="list-group-item"><p style={{ position: "relative", marginBottom: "2px", fontFamily: "Arial, Helvetica, sans-serif" }}>{t('Language.1')}</p></button>
          <button onClick={about} style={{ background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center" }} className="list-group-item"><p style={{ position: "relative", marginBottom: "2px", fontFamily: "Arial, Helvetica, sans-serif" }}>{t('About.1')}</p></button>
        </ListGroup>
      </Card.Body>
      {change}
    </Card>
  )
}

export default withTranslation()(Settings)
