import myPhoto from '../../images/about-me/my-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__details">
          <h3 className="about-me__name">Сергей Ганус</h3>
          <p className="about-me__summary">
            Фронтенд-разработчик, 33 года
          </p>
          <p className="about-me__description">
            Закончил ТТИ ЮФУ в г. Таганрог. Обожаю играть в футбол, баскетбол, слушать музыку
            и программировать. За время обучения на курсе "Веб-разработчик" от Яндекс Практикума
            изучил следующие инструменты и стек технологий: HTML5, CSS3, JavaScript, React, Express,
            MongoDB, Node.js, Git, Webpack, API, Nginx, JWT.
          </p>
          <a className="about-me__link" href="https://github.com/sergeyganus" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Моя фотография" title="Моя фотография"></img>
      </div>
    </section>
  );
}

export default AboutMe;