import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, CornerUpLeft } from 'lucide-react';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/slice';
import { postedAt } from '../utils/date';

function ThreadItem({ id, title, body, category, createdAt, ownerId, upVotesBy, downVotesBy, totalComments }) {
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const owner = users.find((user) => user.id === ownerId);
  const ownerName = owner ? owner.name : 'User';

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = (e) => {
    e.preventDefault();
    dispatch(asyncToggleUpVoteThread(id));
  };

  const handleDownVote = (e) => {
    e.preventDefault();
    dispatch(asyncToggleDownVoteThread(id));
  };

  return (
    <div className="card thread-card" id={`thread-${id}`}>
      <div className="thread-header">
        <span className="category-badge">#{category}</span>
        <Link to={`/threads/${id}`} className="thread-title-link">
          <h2>{title}</h2>
        </Link>
      </div>

      <div
        className="thread-snippet"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="thread-footer">
        <button
          onClick={handleUpVote}
          className={`vote-button ${isUpVoted ? 'up-voted' : ''}`}
          aria-label="Upvote thread"
          title="Upvote thread"
          style={{ padding: '2px' }}
        >
          <ThumbsUp size={15} />
        </button>
        <span style={{ marginRight: '0.4rem' }}>{upVotesBy.length}</span>

        <button
          onClick={handleDownVote}
          className={`vote-button ${isDownVoted ? 'down-voted' : ''}`}
          aria-label="Downvote thread"
          title="Downvote thread"
          style={{ padding: '2px' }}
        >
          <ThumbsDown size={15} />
        </button>
        <span style={{ marginRight: '0.8rem' }}>{downVotesBy.length}</span>

        <div className="comments-count-icon" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginRight: '0.8rem' }}>
          <CornerUpLeft size={15} />
          <span>{totalComments}</span>
        </div>

        <span style={{ marginRight: '0.8rem' }}>{postedAt(createdAt)}</span>

        <span>
          Dibuat oleh <strong>{ownerName}</strong>
        </span>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
