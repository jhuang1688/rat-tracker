import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';

export default function ImgMediaCard() {
  return (
    <Container maxWidth="sm">
    <CssBaseline />
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image="https://live-production.wcms.abc-cdn.net.au/278f37b1094bc95b2b3f685984870d96?impolicy=wcms_crop_resize&cropH=1152&cropW=2048&xPos=0&yPos=107&width=862&height=485"
      />
    </Card>
    </Container>
  );
}