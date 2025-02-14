
import { Link } from 'react-router-dom';




const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (

<nav className='nav'>
  <ul className='nav-item'>
        <li>
          <Link to="/" className='nav-link'>Home</Link>
        </li>
      
        <li>
          <Link to="/SavedCandidates" className='nav-link'>SavedCandidates</Link>
        </li>
      </ul>
    </nav>

  )
};

export default Nav;
