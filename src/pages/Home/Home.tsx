import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Layout from '../../components/Layout/Layout';
import FilterSection from '../../components/FilterSection/FilterSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import ContentList from '../../components/ContentList/ContentList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <div className="home">
          <header className="home-header">
            <h1>CLO-SET CONNECT Store</h1>
          </header>
          
          <div className="home-content">
            <aside className="sidebar">
              <FilterSection />
            </aside>
            
            <main className="main-content">
              <SearchBar />
              <ContentList />
            </main>
          </div>
        </div>
      </Layout>
    </Provider>
  );
};

export default Home;