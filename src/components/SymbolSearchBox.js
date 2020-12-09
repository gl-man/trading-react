import React, { useCallback, useEffect, useState } from "react";
import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";

import api from "services/api";
import useDebounce from "utils/use-debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  list: {
    width: "100%",
  },
  formControl: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
}));

const Autocomplete = ({ onSelect, label }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    if (!debouncedValue) return;
    api
      .get("/search", {
        params: {
          query: debouncedValue.toUpperCase(),
          limit: 5,
          // exchange: "",
        },
      })
      .then((data) => {
        if(!data || !Array.isArray(data)) {
          throw Error ("No Data or Invalid data: " + JSON.stringify(data, 2, null));
        }
        setSymbols(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [debouncedValue]);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleSelect = useCallback(
    (selection) => {
      onSelect(selection.symbol);
    },
    [onSelect]
  );

  return (
    <Downshift
      inputValue={value}
      onChange={handleSelect}
      onInputValueChange={handleChange}
      itemToString={(item) => (item ? item.symbol : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        getRootProps,
      }) => (
        <Box className={classes.root}>
          <TextField
            {...getRootProps()}
            className={classes.formControl}
            variant="outlined"
            label={label}
            color="primary"
            InputLabelProps={getLabelProps()}
            inputProps={getInputProps()}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          {!!(isOpen && symbols && symbols.length) && (
            <Paper className={classes.paper} square>
              <List component="ul" dense className={classes.list} {...getMenuProps()}>
                {symbols.map((item, index) => (
                  <ListItem
                    button
                    {...getItemProps({
                      key: item.symbol,
                      index,
                      item,
                    })}
                  >
                    <ListItemText
                      primary={item.symbol}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {item.name}
                          </Typography>
                          {` — ${item.exchangeShortName}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      )}
    </Downshift>
  );
};

export default Autocomplete;
