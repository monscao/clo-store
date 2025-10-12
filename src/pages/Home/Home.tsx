import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import FilterSection from '../../components/FilterBar/FilterBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import ContentList from '../../components/ContentList/ContentList';
import './Home.scss'

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="home">
        <header className="home-header">
          <a href="https://connect.clo-set.com/zh">
            <div className='home-icon'></div>
          </a>
        </header>
        <div className="home-content">
          <div>
            <SearchBar />
            <FilterSection />
          </div>
          <main className="content-main">
            <ContentList />
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default Home;