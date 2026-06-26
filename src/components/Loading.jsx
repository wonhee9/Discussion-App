
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../states/loading/slice';

function Loading() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-bar-container" id="loading-bar">
      <div className="loading-bar" />
    </div>
  );
}

export default Loading;
