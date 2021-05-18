import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";

const useStyle = makeStyles((theme) => ({
  updateButton: {
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
  onClickUpdateDialogButton: () => void;
};

export const HouseworkDetailDialog: React.FC<Props> = ({
  housework,
  isOpen,
  onClose,
  onClickUpdateDialogButton,
}) => {
  const classes = useStyle();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle disableTypography>
        <Typography variant={"h6"}>{housework.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClickUpdateDialogButton}
          className={classes.updateButton}
        >
          <CreateIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>説明： {housework.description}</DialogContentText>
        <DialogContentText>ポイント： {housework.point}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
