import imageLink from '../../images/portfolio/portfolio-image-link.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/sergeyganus/how-to-learn" target="_blank" rel="noopener noreferrer">
            Статичный сайт
          </a>
          <a className="portfolio__image-link" href="https://github.com/sergeyganus/how-to-learn" target="_blank" rel="noopener noreferrer">
            <img className="portfolio__icon" src={imageLink} alt="Ссылка на статичный сайт" title="Ссылка на статичный сайт" />
          </a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/sergeyganus/russian-travel" target="_blank" rel="noopener noreferrer">
            Адаптивный сайт
          </a>
          <a className="portfolio__image-link" href="https://github.com/sergeyganus/russian-travel" target="_blank" rel="noopener noreferrer">
            <img className="portfolio__icon" src={imageLink} alt="Ссылка на адаптивный сайт" title="Ссылка на адаптивный сайт" />
          </a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/sergeyganus/react-mesto-auth" target="_blank" rel="noopener noreferrer">
            Одностраничное приложение
          </a>
          <a className="portfolio__image-link" href="https://github.com/sergeyganus/react-mesto-auth" target="_blank" rel="noopener noreferrer">
            <img className="portfolio__icon" src={imageLink} alt="Ссылка на одностраничное приложение" title="Ссылка на одностраничное приложение" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;