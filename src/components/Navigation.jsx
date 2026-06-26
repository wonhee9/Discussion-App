import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/slice';
import { MessageSquare, BarChart2, LogOut, LogIn } from 'lucide-react';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Header */}
      <header className="app-header" id="app-header">
        <div className="header-container">
          <Link to="/" className="header-title">
            DICODING FORUM APP
          </Link>
          {authUser && (
            <div className="header-user">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="header-avatar"
                title={`Masuk sebagai ${authUser.name}`}
              />
              <span className="header-username">{authUser.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav" id="bottom-nav">
        <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
          <MessageSquare size={22} />
          <span>Threads</span>
        </Link>
        <Link to="/leaderboards" className={`bottom-nav-item ${isActive('/leaderboards') ? 'active' : ''}`}>
          <BarChart2 size={22} />
          <span>Leaderboards</span>
        </Link>
        {authUser ? (
          <button onClick={onLogout} className="bottom-nav-item btn-tab">
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className={`bottom-nav-item ${isActive('/login') || isActive('/register') ? 'active' : ''}`}>
            <LogIn size={22} />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </>
  );
}

export default Navigation;
