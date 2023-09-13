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
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/sergeyganus/russian-travel" target="_blank" rel="noopener noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/sergeyganus/react-mesto-auth" target="_blank" rel="noopener noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;