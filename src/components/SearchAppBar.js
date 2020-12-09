import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { ReactComponent as Logo } from "assets/images/logo.svg";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

export default function SearchAppBar({ children }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          <Logo width={60} height={60} />
          <span className={classes.titleText}>Company-Search-UI</span>
        </Typography>
        <Box paddingLeft={2} flex={1}>
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
