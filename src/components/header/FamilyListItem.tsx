import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";

type Props = {
  name: string;
  imageSrc: string;
  memberCount: number;
  selected: boolean;
  onClickFamily: () => void;
};

export const FamilyListItem: React.FC<Props> = ({
  name,
  imageSrc,
  memberCount,
  selected,
  onClickFamily,
}) => {
  const list: React.ReactNodeArray = [];

  for (let i = 0; i < memberCount; i++) {
    list.push(<AccountCircleIcon key={i} fontSize={"small"} />);
  }

  return (
    <ListItem button selected={selected} onClick={onClickFamily}>
      <ListItemAvatar>
        <Avatar variant={"rounded"} alt="ファミリーのプロフィール画像" src={imageSrc} />
      </ListItemAvatar>
      <ListItemText primary={`${name}家`} secondary={<>{list}</>} />
    </ListItem>
  );
};
