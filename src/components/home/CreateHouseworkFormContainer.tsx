import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateHouseworkFormContainer: React.FC<Props> = ({ isOpen, onClose }) => {
  const onClickCreateHousework = () => {
    // todo 作成ボタンを押したときの処理
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>家事を追加</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="タイトル" type="text" fullWidth />
          <TextField margin="normal" label="詳細" type="text" fullWidth rows={4} multiline />
          <TextField margin="normal" label="ポイント" type="number" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            キャンセル
          </Button>
          <Button onClick={onClickCreateHousework} color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
