import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import "./mainMenu.css";

const theme = createTheme();

function Menu() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Rat Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Menu Hub
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome Henry!
            </Typography>
          </Container>
        </Box>
        {/* End of heading */}

        {/* Card section starts */}

        <Grid container spacing={4} columns={18}>
          <Grid xs={16} sm={8} marginLeft={5} paddingTop={5}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Submit Rapid Antigen Test Results
                </Typography>
                <Typography>
                  Submit in your RAT test results here
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/submission">
                <Button size="small" variant="outlined">
                    Submit Now
                </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={16} sm={8} marginLeft={5} paddingTop={5}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Check Submission History
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/dashboard">
                <Button size="small" variant="outlined">
                    See test results as a manager
                </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* End of card */}
      </main>
    </ThemeProvider>
  );
}

export default Menu;
