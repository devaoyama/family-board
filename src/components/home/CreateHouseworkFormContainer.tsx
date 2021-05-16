import React, { useCallback, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import { useCreateHousework } from "src/hooks/houseworks/useCreateHousework";
import { CurrentFamilyContext } from "src/contexts/currentFamilyContext";

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
    reset,
  } = useForm<FormData>();
  const currentFamily = useContext(CurrentFamilyContext);
  const { createHousework } = useCreateHousework({});

  const onClickCreateHousework = useCallback(
    async (data) => {
      await createHousework(currentFamily.id, data.title, data.description, parseInt(data.point));
      reset();
      onClose();
    },
    [currentFamily.id],
  );

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
          <Button
            onClick={handleSubmit(onClickCreateHousework)}
            disabled={isSubmitting}
            color="primary"
          >
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
