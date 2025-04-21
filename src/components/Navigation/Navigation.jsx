import { NavLink, useLocation } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const location = useLocation();

  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <header className={s.navigation}>
      <nav className={s.menu}>
        <NavLink className={setActiveClass} to="/" state={location}>
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/movies/" state={location}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
