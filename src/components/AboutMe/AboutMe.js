import './AboutMe.css';
import avatar from '../../images/MyPhoto.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Валерий</h3>
            <p className="about-me__age">Фронтенд-разработчик, 22 года</p>
            <p className="about-me__text">
              Я родился в Санкт-Петербурге, сейчас живу в Лондоне, полгода учился в СПБГУП на режиссера мультимедии.
              Люблю фотографировать и обрабатывать видео.
              Недавно начал кодить. Официально нигде не работаю. Прошёл
              курс по веб-разработке и хочу найти работу в IT.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/valvdov"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика"
          />
        </div>
      </div>
    </section>
  );
}
