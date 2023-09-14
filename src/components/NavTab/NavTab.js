import './NavTab.css';

function NavTab() {
  return (
    <ul className="navigation-tabs">
      <li className="navigation-tabs__item">
        <a className="navigation-tabs__link" href="#about-project">О проекте</a>
      </li>
      <li className="navigation-tabs__item">
        <a className="navigation-tabs__link" href="#techs">Технологии</a>
      </li>
      <li className="navigation-tabs__item">
        <a className="navigation-tabs__link" href="#about-me">Студент</a>
      </li>
    </ul>
  );
}

export default NavTab;