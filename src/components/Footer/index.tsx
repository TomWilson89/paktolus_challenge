import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // position: "fixed",
  },
  appbar: {
    padding: 10,
    bottom: 0,
    top: "auto",
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Typography variant="caption">&copy; Crazy Slot . 2021</Typography>
      </AppBar>
    </div>
  );
};

export default Footer;
