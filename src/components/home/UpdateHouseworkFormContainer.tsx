import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";

const useStyle = makeStyles((theme) => ({
  deleteButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

type Props = {
  housework: HouseworksFragment;
  isOpen: boolean;
  onClose: () => void;
  onClickUpdateButton: (data: FormData) => void;
  onClickDeleteButton: () => void;
};

type FormData = {
  title: string;
  description: string;
  point: number;
};

export const UpdateHouseworkFormContainer: React.FC<Props> = ({
  housework,
  isOpen,
  onClose,
  onClickUpdateButton,
  onClickDeleteButton,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: housework.title,
      description: housework.description || "",
      point: housework.point,
    },
  });
  const classes = useStyle();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle disableTypography>
        <Typography variant={"h6"}>{housework.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClickDeleteButton}
          className={classes.deleteButton}
        >
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="title"
          control={control}
          rules={{ required: "??????????????????????????????" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              type="text"
              label="????????????"
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
          render={({ field: { onChange, value } }) => (
            <TextField
              type="text"
              label="??????"
              value={value}
              onChange={onChange}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              margin="normal"
              rows={4}
              fullWidth
              multiline
            />
          )}
        />
        <Controller
          name="point"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              type="number"
              label="????????????"
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
          ???????????????
        </Button>
        <Box mx="auto" />
        <Button onClick={handleSubmit(onClickUpdateButton)} disabled={isSubmitting} color="primary">
          ??????
        </Button>
      </DialogActions>
    </Dialog>
  );
};
