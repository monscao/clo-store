import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import FilterBar from '../../components/FilterBar/FilterBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import ContentList from '../../components/ContentList/ContentList';
import SortingDropdown from '../../components/SortingDropdown/SortingDropdown';
import './Home.scss'

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="home">
        <header className="home-header">
          <div className='header-left'>
            <a href="https://connect.clo-set.com/zh">
              <div className='home-icon'></div>
            </a>
            <nav className="header-nav">
              <button className="nav-button active">Store</button>
              <button className="nav-button">Portfolio</button>
              <button className="nav-button">Contest</button>
              <button className="nav-button">Community</button>
              <button className="nav-button">Application</button>
              <button className="nav-button">Gamewear</button>
            </nav>
          </div>
           <div className="header-right">
            <button className="auth-button login-button">Login</button>
            <button className="auth-button register-button">Register</button>
          </div>
        </header>
        <div className="home-content">
          <div className="content-filter">
            <SearchBar />
            <FilterBar />
          </div>
          <main className="content-main">
            <SortingDropdown />
            <ContentList />
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default Home;