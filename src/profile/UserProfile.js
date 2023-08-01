import React, { useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/apiHelpers'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

  const [bookings, setBookings] = useState();

  // render users name and email when users have no any bookings 
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking().then((res) => setBookings(res.bookings)).catch((err) => console.log(err));
    
    getUserDetails().then((res) => setUser(res.user)).catch((err) => console.log(err));
  })

  // console.log(bookings);

  // For Booking Date
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  const handleDelete = async (id) => {
    deleteBooking(id).then((res) => console.log(res)).catch((err) => console.log(err));
    toast.error('Booking Deleted Successfully');
  }

  return (
    <Box width={"100%"} display={'flex'} >

      <>

        {user && <Box padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={"30%"}>
          <AccountCircleRoundedIcon sx={{ fontSize: "9rem", textAlign: "center", marginLeft: "150px" }} />
          <Typography padding={1} width={"auto"} textAlign={'center'} border={"1px solid #ccc"} borderRadius={6}>Name:{user.name}</Typography>
          <Typography padding={1} width={"auto"} textAlign={'center'} border={"1px solid #ccc"} borderRadius={6} mt={1} >Email:{user.email}</Typography>
        </Box>}

        {bookings && <Box width={"70%"} display={'flex'} flexDirection={'column'}>
          <Typography variant='h3' fontFamily={"vardana"} textAlign={'center'} padding={2}>Bookings</Typography>
          <Box margin={"auto"} display={'flex'} flexDirection={'column'} width={"80%"}>
            <List>
              {
                bookings.map((bookings, index) => (
                  <ListItem sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 1 }}>
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left", }}>Movie: {bookings.movie.title}</ListItemText>
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left", }}>Seat: {bookings.seatNumber}</ListItemText>
                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left", }}>Date: {new Date(bookings.date).toLocaleString(undefined, dateOptions)}</ListItemText>

                    <IconButton onClick={() => handleDelete(bookings._id)} color='error' >
                      <DeleteIcon color='red' />
                    </IconButton>

                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Box>}

      </>

      <ToastContainer />
    </Box>
  )
}

export default UserProfile