import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

type Props = {
  onClickLogin: () => void;
  onClickSignUp: () => void;
};

export const LoginCard: React.FC<Props> = ({ onClickLogin, onClickSignUp }) => {
  return (
    <React.Fragment>
      <Typography variant={"h5"} component={"h1"} color={"inherit"} align={"center"}>
        ファミリーボード
      </Typography>
      <Box my={2} />
      <Button variant={"contained"} color={"primary"} fullWidth onClick={onClickLogin}>
        ログイン
      </Button>
      <Box my={2} />
      <Button variant={"contained"} color={"default"} fullWidth onClick={onClickSignUp}>
        登録
      </Button>
    </React.Fragment>
  );
};
