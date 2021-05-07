import React, { useCallback } from "react";
import { Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginCard } from "src/components/login/LoginCard";

const useStyle = makeStyles(() => ({
  container: {
    minHeight: "80vh",
  },
}));

export const LoginContainer: React.FC = () => {
  const classes = useStyle();
  const { loginWithRedirect } = useAuth0();

  const onClickLogin = useCallback(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  const onClickSignUp = useCallback(() => {
    loginWithRedirect({ screen_hint: "signup" });
  }, [loginWithRedirect]);

  return (
    <Grid container alignItems="center" justify="center" className={classes.container}>
      <Grid item lg={4} md={6} sm={8} xs={10}>
        <LoginCard onClickLogin={onClickLogin} onClickSignUp={onClickSignUp} />
      </Grid>
    </Grid>
  );
};
