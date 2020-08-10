import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, country, cases, lastcases, lastdeath, transmission) {
  return { id, country, cases, lastcases, lastdeath, transmission };
}

const rows = [
  createData(0, 'USA', '4,951,851', '53,893', '5719', 'Community transmission'),
  createData(1, 'Brazil', '3,012,412', '49,970', '1,059', 'Community transmission'),
  createData(2, 'India', '2,215,074', '62,064', '905', 'Cluster of cases'),
  createData(3, 'Russia', '892,654', '5,118', '1007', 'Cluster of cases'),
  createData(4, 'South Africa', '559859', '6,671', '70', 'Community transmission'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Situation by Country,Territory & Area</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Cases-cumulative</TableCell>
            <TableCell>Cases-reported in last 24 hours</TableCell>
            <TableCell>Deaths-reported in last 24 hours</TableCell>
            <TableCell align="right">Transmission Classification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.cases}</TableCell>
              <TableCell>{row.lastcases}</TableCell>
              <TableCell>{row.lastdeath}</TableCell>
              <TableCell align="right">{row.transmission}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more information
        </Link>
      </div>
    </React.Fragment>
  );
}
