import React from "react";
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { useTooltip } from "src/hooks/common/useTooltip";

type Props = {
  onClickBackButton: () => void;
  inviteCode?: string;
};

export const InviteMemberCode: React.FC<Props> = ({ onClickBackButton, inviteCode }) => {
  const { isOpen, open, close } = useTooltip();

  return (
    <>
      <IconButton aria-label="back" onClick={onClickBackButton}>
        <BackspaceIcon fontSize={"large"} />
      </IconButton>
      <Container>
        <Typography variant={"subtitle1"}>招待コード</Typography>
        <FormControl variant="outlined" fullWidth disabled>
          <OutlinedInput
            type="text"
            value={inviteCode}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip
                  arrow
                  open={isOpen}
                  onClose={close}
                  disableHoverListener
                  placement="top"
                  title="Copied!"
                >
                  <CopyToClipBoard text={inviteCode || ""}>
                    <IconButton onClick={open}>
                      <AssignmentIcon />
                    </IconButton>
                  </CopyToClipBoard>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
      </Container>
    </>
  );
};
