import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs quite help that it changes
          all the time. Clothes have always been a marker of the era and we are
          in a revolution. Your fashion makes you been seen and heard that way
          you are. So, celebrate the seasons new and exciting fashion in your
          own way.
        </p>
        <Link to="/jobs">
          <button type="button" className="shop-now-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
