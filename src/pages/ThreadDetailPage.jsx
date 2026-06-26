import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import {
  asyncGetThreadDetail,
  clearThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
} from '../states/threadDetail/slice';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';
import { postedAt } from '../utils/date';

function ThreadDetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const handleUpVote = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const handleDownVote = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  if (!threadDetail) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-tertiary)' }}>Memuat detail diskusi...</p>
      </div>
    );
  }

  const isUpVoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && threadDetail.downVotesBy.includes(authUser.id);

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="thread-detail" id="thread-detail-container">
        <article className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span className="category-badge">#{threadDetail.category}</span>
          
          <h1 style={{ fontSize: '2.25rem', marginTop: 0, textAlign: 'left', lineHeight: 1.2 }}>
            {threadDetail.title}
          </h1>

          <div className="detail-header-meta">
            <div className="creator-info">
              <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="creator-avatar" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{threadDetail.owner.name}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-tertiary)' }}>
              <Calendar size={16} />
              <span>{postedAt(threadDetail.createdAt)}</span>
            </div>
          </div>

          <div
            className="thread-detail-body"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
            <div className="votes-container">
              <button
                onClick={handleUpVote}
                className={`vote-button ${isUpVoted ? 'up-voted' : ''}`}
                aria-label="Upvote thread"
                title="Upvote thread"
              >
                <ThumbsUp size={18} />
              </button>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{threadDetail.upVotesBy.length}</span>

              <button
                onClick={handleDownVote}
                className={`vote-button ${isDownVoted ? 'down-voted' : ''}`}
                aria-label="Downvote thread"
                title="Downvote thread"
              >
                <ThumbsDown size={18} />
              </button>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{threadDetail.downVotesBy.length}</span>
            </div>
          </div>
        </article>

        <section className="comments-section">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            Tanggapan ({threadDetail.comments.length})
          </h3>

          <CommentInput authUser={authUser} addComment={onAddComment} />

          <CommentsList comments={threadDetail.comments} />
        </section>
      </div>
    </div>
  );
}

export default ThreadDetailPage;
