// import React from 'react';
// import authors from '../../Utils/Authors'
// import Box from '@mui/material/Box';
// import { Paper, Typography } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import Carousel from 'react-material-ui-carousel'

// const data = authors
// function Example() {
    
//     return (
//         <Carousel>
//             {data.slice(0, 15).map((data) => {
//                 return (
//                     <Box>
//                         <Paper elevation={3} sx={{ minWidth: 270, marginLeft: "15px", minheight: 300 }}>
//                             <Card >
//                                 <CardContent >
//                                     <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                                         <Typography variant="h6" sx={{ mr: 1 }} >
//                                             {data.firstName}
//                                         </Typography>
//                                         <Typography variant="h6" >
//                                             {data.lastName}
//                                         </Typography>
//                                     </Box>
//                                     <Typography variant="h7" >
//                                         Contact-{data.phone}
//                                     </Typography>
//                                     <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>

//                                         <Button variant="outlined" >Details</Button>
//                                     </Box>
//                                 </CardContent>
//                             </Card>
//                         </Paper>
//                     </Box>
//                 )

//             }
//             )

//             }
//         </Carousel>
//     )
// }

// export default Example