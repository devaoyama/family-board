import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  title: string;
  description: string;
  point: number;
};

export const CreateHouseworkFormContainer: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onClickCreateHousework = () => {
    // todo 作成ボタンを押したときの処理
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>家事を追加</DialogTitle>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "タイトルは必須です。" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="text"
                label="タイトル"
                value={value}
                onChange={onChange}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                type="text"
                label="説明"
                value={value}
                onChange={onChange}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="point"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                type="number"
                label="ポイント"
                value={value}
                onChange={onChange}
                error={Boolean(errors.point)}
                helperText={errors.point?.message}
                required
                fullWidth
                margin="normal"
              />
            )}
          />
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
