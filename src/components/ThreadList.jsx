
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import { HelpCircle } from 'lucide-react';

function ThreadList({ threads }) {
  if (threads.length === 0) {
    return (
      <div className="card empty-state" id="empty-threads-state">
        <HelpCircle className="empty-state-icon" />
        <h2>Belum Ada Thread</h2>
        <p>Jadilah yang pertama membuat thread diskusi baru di forum ini!</p>
      </div>
    );
  }

  return (
    <div className="thread-list" id="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ThreadList;
