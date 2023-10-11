import CollapseButton from './CollapseButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as Logo } from './logo-cropped.svg';
import FormComponent from './FormComponent';
import Article from './article/Article';

const Dashboard = ({ children }) => {
    return (
      <div>
<svg style={{display:"none"}}>
  <symbol id="down" viewBox="0 0 16 16">
    <polygon points="3.81 4.38 8 8.57 12.19 4.38 13.71 5.91 8 11.62 2.29 5.91 3.81 4.38" />
  </symbol>
</svg>
<header className="page-header">
  <nav>
    {/* <a href="#0" aria-label="forecastr logo" className="logo"> */}
      {/* <svg> */}
        <Logo />
      {/* </svg> */}
    {/* </a> */}
    <button className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
      <svg width="20" height="20" aria-hidden="true">
        <use xlinkHref="#down"></use>
      </svg>
    </button>
    <ul className="admin-menu">
      <li className="menu-heading">
        <h3>Admin</h3>
      </li>
      <li>
        <a href="#0">
        <AutoStoriesIcon />
        <span>Pages</span>
        </a>
      </li>

      <li>
        <div className="switch">
          <input type="checkbox" id="mode" defaultChecked />
          <label htmlFor="mode">
            <span></span>
            <span>Dark</span>
          </label>
        </div>
        <CollapseButton />
      </li>
    </ul>
  </nav>
</header>
<section className="page-content">
  <section className="search-and-user">
    <form>
      <input type="search" placeholder="Search Pages..." />
      <button type="submit" aria-label="submit form">
        <svg aria-hidden="true">
        <SearchIcon />
        </svg>
      </button>
    </form>
    <div className="admin-profile">
      <span className="greeting">Hello admin</span>
      <div className="notifications">
        <span className="badge">1</span>
        <AccountCircleIcon />
      </div>
    </div>
  </section>
  <Article 
    metadata={{title: 'Title of the first article ever!!'}}
  />
  <footer className="page-footer">
    <span>made by </span>
  </footer>
</section>
</div>
    );
  };
  
export default Dashboard;