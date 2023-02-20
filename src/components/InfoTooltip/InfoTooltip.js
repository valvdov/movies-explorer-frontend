import React from 'react';
import './InfoTooltip.css'
import truth from "../../images/truth.svg"
import error from "../../images/error.svg"

function InfoTooltip({ isOpen, onClose, success, message }) {
    return (
        <section className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}>
            <div className="info-tooltip__container">
                <button id="success-close-button" type="button" className="info-tooltip__close-button" onClick={onClose}/>
                <img className="info-tooltip__status" src={`${success ? truth : error}`} alt="" />
                <h2 className="info-tooltip__title">{message}</h2>
            </div>
        </section>
    )
}

export default InfoTooltip;
