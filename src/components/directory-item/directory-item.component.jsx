import {useNavigate} from "react-router-dom";

import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const {imageUrl, title, route} = category;
  const navigate = useNavigate();

  const onNavigateFunction = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={onNavigateFunction}>
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className="body" >
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export default DirectoryItem;