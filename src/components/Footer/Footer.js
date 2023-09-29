import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2023</p>
        <ul className="footer__links-list">
          <li className="footer__links-item">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link" href="https://github.com/sergeyganus" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;