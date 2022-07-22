import faker from 'faker';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
import PhotoIcon from '@mui/icons-material/Photo';
import "../mainMenu/mainMenu.css"
import Navbar from "./NavbarDashboard";

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

//////////////////////////////////
// Get data from dynamodb via API gateway
const axios = require("axios");

export const getUsers = () => {
  return axios
    .get("https://ohplkkb1qe.execute-api.ap-southeast-2.amazonaws.com/dev")
    .then(function (response) {
      // console.log(JSON.stringify(response))
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

function Dashboard() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [flag, setFlag] = useState(false);
  const [USERS, setUsers] = useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!flag) {
      getUsers().then((response) => {
        let USERS1 = response.data;
        console.log(USERS1);
        for (let i=0; i < USERS1.length; i++) {
          USERS1[i] = {
            name: faker.name.findName(),
            MemberId: USERS1[i].MemberId.S, 
            testId: USERS1[i].testId.S, 
            ratDate: USERS1[i].Timestamp.S,
            status: USERS1[i].Result.S,
          }
        }
        
        USERS1.sort(function(a, b) {
          return b.ratDate - a.ratDate;
        }); // Sort recent date first
    
        setFlag(true);
        setUsers(USERS1);
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="Dashboard"> 
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
                <TableCell className={classes.tableHeaderCell}>Test Date</TableCell>
                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                <TableCell className={classes.tableHeaderCell}>Photo Evidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                      <Grid container>
                          <Grid item lg={2}>
                              <Avatar alt={row.name} src='.' className={classes.avatar}/>
                          </Grid>
                          <Grid item lg={10}>
                              <Typography className={classes.name}>{row.name}</Typography>
                              <Typography color="textSecondary" variant="body2">ID: {row.MemberId}</Typography>
                              <Typography color="textSecondary" variant="body2">Test: {row.testId}</Typography>
                          </Grid>
                      </Grid>
                    </TableCell>
                  <TableCell>{row.ratDate}</TableCell>
                  <TableCell>
                      <Typography 
                        className={classes.status}
                        style={{
                            backgroundColor: 
                            ((row.status === 'negative' && 'green') ||
                            (row.status === 'positive' && 'red') ||
                            (row.status === 'error' && 'orange'))
                        }}
                      >{row.status}</Typography>
                    </TableCell>
                    <TableCell>
                      <PhotoIcon onClick={event =>  window.location.href='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhappymag.tv%2Fwp-content%2Fuploads%2F2022%2F01%2FRAT-1.png&f=1&nofb=1'}>
                      </PhotoIcon>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={USERS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </TableFooter>
          </Table>
        </TableContainer>
        </div>
    </div>
    
  );
}

export default Dashboard;
