import { FC } from "react";
import {useNavigate} from "react-router-dom";

import { CategoriesTypes } from "../directory/directory.component";

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

type DirectotyItemProps = {
  category: CategoriesTypes;
}

const DirectoryItem: FC<DirectotyItemProps> = ({ category }) => {
  const {imageUrl, title, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;