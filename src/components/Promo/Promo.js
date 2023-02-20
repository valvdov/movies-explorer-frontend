import './Promo.css';
import logo from '../../images/landing-logo.svg';
import { HashLink as Link } from 'react-router-hash-link';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link to="#about" className="promo__learn-more-link" >
          Узнать больше
          </Link>
        </div>
        <img src={logo} alt="логотип - планета web" className="promo__logo" />
      </div>
    </section>
  );
}
