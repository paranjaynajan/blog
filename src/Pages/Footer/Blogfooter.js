import React from 'react'
import { Box, Container, Grid, Typography } from "@mui/material";
function Blogfooter() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#1976d2",
        marginTop: '40px',
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="White" variant="h5">
              My Blog
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {` +188574643 | LinkedIn | Facebook `}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>

  )
}

export default Blogfooter
