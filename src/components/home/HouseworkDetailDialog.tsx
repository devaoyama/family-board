import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";

type Props = {
  housework: HouseworksFragment;
  isOpen: boolean;
  onClose: () => void;
  onClickDeleteButton: () => void;
};

export const HouseworkDetailDialog: React.FC<Props> = ({
  housework,
  isOpen,
  onClose,
  onClickDeleteButton,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>詳細</DialogTitle>
      <DialogContent>
        <DialogContentText>説明： {housework.description}</DialogContentText>
        <DialogContentText>ポイント： {housework.point}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickDeleteButton} color="secondary">
          削除
        </Button>
        <Box mx="auto" />
        <Button onClick={onClose} color="inherit">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
