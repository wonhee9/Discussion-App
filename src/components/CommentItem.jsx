import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { asyncToggleUpVoteComment, asyncToggleDownVoteComment } from '../states/threadDetail/slice';
import { postedAt } from '../utils/date';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    dispatch(asyncToggleUpVoteComment(id));
  };

  const handleDownVote = () => {
    dispatch(asyncToggleDownVoteComment(id));
  };

  return (
    <div className="comment-card" id={`comment-${id}`}>
      <div className="comment-header">
        <div className="creator-info">
          <img src={owner.avatar} alt={owner.name} className="creator-avatar" />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{owner.name}</span>
        </div>

        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{postedAt(createdAt)}</span>
      </div>

      <div className="comment-body" dangerouslySetInnerHTML={{ __html: content }} />

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div className="votes-container">
          <button
            onClick={handleUpVote}
            className={`vote-button ${isUpVoted ? 'up-voted' : ''}`}
            aria-label="Upvote comment"
            title="Upvote comment"
          >
            <ThumbsUp size={14} />
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{upVotesBy.length}</span>

          <button
            onClick={handleDownVote}
            className={`vote-button ${isDownVoted ? 'down-voted' : ''}`}
            aria-label="Downvote comment"
            title="Downvote comment"
          >
            <ThumbsDown size={14} />
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentItem;
