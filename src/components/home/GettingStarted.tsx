import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(() => ({
  container: {
    minHeight: "60vh",
  },
}));

export const GettingStarted: React.FC = () => {
  const classes = useStyle();

  return (
    <>
      <Grid container alignItems="center" justify="center" className={classes.container}>
        <Grid item lg={4} md={6} sm={8} xs={10}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                component={"h3"}
                variant={"subtitle1"}
                align={"center"}
                color="textPrimary"
              >
                ファミリーを作成してみよう！
              </Typography>
              <Box my={2} />
              <Link href={"/families/create"}>
                <Button variant={"contained"} color={"primary"} fullWidth>
                  ファミリーを作成
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
