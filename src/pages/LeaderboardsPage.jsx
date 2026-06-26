import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trophy } from 'lucide-react';
import { asyncGetLeaderboards } from '../states/leaderboards/slice';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="main-content">
      <div className="leaderboard-container" id="leaderboard-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <Trophy size={32} style={{ color: '#f59e0b' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Klasemen Pengguna Teraktif</h2>
        </div>

        <div className="leaderboard-list">
          {leaderboards.map((item, index) => {
            const rank = index + 1;
            let rankClass = '';
            if (rank === 1) rankClass = 'leaderboard-rank-1';
            else if (rank === 2) rankClass = 'leaderboard-rank-2';
            else if (rank === 3) rankClass = 'leaderboard-rank-3';

            return (
              <div key={item.user.id} className="leaderboard-item">
                <div className="leaderboard-user-details">
                  <span className={`leaderboard-rank ${rankClass}`}>#{rank}</span>
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="user-avatar-small"
                    style={{ border: 'none', width: '38px', height: '38px' }}
                  />
                  <span className="leaderboard-username">{item.user.name}</span>
                </div>
                <span className="leaderboard-score">{item.score} Pts</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardsPage;
