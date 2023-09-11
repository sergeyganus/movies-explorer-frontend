import myPhoto from '../../images/about-me/my-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__details">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__summary">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/sergeyganus" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Моя фотография" title="Моя фотография"></img>
      </div>
    </section>
  );
}

export default AboutMe;