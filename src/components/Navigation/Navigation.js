import './Navigation.css';

function Navigation({ name, children }) {
  return (
    <nav className={`navigation navigation_type_${name}`}>
      <ul className={`navigation__links-list navigation__links-list_type_${name}`}>
        {children}
      </ul>
    </nav>
  );
}

export default Navigation;