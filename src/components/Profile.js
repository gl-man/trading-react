import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    padding: theme.spacing(1),
    background: "#fff",
  },
  red: {
    color: "#dc004e",
  },
  green: {
    color: "#4caf50",
  },
}));

const IntroText = ({ children }) => (
  <Typography variant="h6" color="textPrimary" component="p" gutterBottom>
    {children}
  </Typography>
);

const AddressText = ({ children }) => (
  <Typography variant="h6" color="textSecondary" component="p" align="right">
    {children}
  </Typography>
);

const financeKeys = ["beta", "volAvg", "mktCap", "lastDiv", "dcfDiff", "dcf"];

// const dataKeys = ["ipoDate", "range", "cik", "isin", "cusip"];

export default function Profile({ data }) {
  const classes = useStyles();

  if (!data) return <React.Fragment />;
  const isNegative = data.changes < 0;
  const sign = isNegative ? "" : "+";

  return (
    <Container maxWidth="lg" component="section" className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        margin={5}
        position="relative"
      >
        <Avatar
          alt={data.companyName}
          src={data.image}
          className={classes.avatar}
        />
        <Box flex={1} margin={1}>
          <Typography variant="h4" color="textPrimary" component="p">
            {data.companyName}
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            {`${data.symbol} — ${data.exchangeShortName}(${data.exchange})`}
          </Typography>
          <Typography
            variant="body1"
            color="textPrimary"
            component={Link}
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.website}
          </Typography>
        </Box>
        <Box margin={1}>
          <Typography
            display="inline"
            variant="h5"
            color="textPrimary"
            component="p"
          >
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: data.currency,
            }).format(data.price)}
            &nbsp;&nbsp;
            <Typography component="span" variant="caption" color="textPrimary">
              {data.currency}
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h6"
              color="textSecondary"
              component="span"
              className={isNegative ? classes.red : classes.green}
            >
              {`(${sign}${data.changes})`}
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box margin={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <IntroText>Sector: {data.sector}</IntroText>
            <IntroText>Industry: {data.industry}</IntroText>
            <IntroText>CEO: {data.ceo}</IntroText>
            <IntroText>Employees: {data.fullTimeEmployees}</IntroText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddressText>{data.address}</AddressText>
            <AddressText>
              {data.city}, {data.state} {data.zip}
            </AddressText>
            <AddressText>{data.country}</AddressText>
            <AddressText>+{data.phone}</AddressText>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textPrimary" component="p">
              {data.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box margin={3}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Finance Table">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data)
                .filter((key) => financeKeys.includes(key))
                .map((key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell>{data[key]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
