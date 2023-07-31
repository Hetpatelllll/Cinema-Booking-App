import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { deleteMovieById, getAdminById } from "../api-helpers/apiHelpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminProfile = () => {

  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    deleteMovieById(id).then((res) => console.log(res)).catch((err) => console.log(err));
    toast.error('Movie Deleted Successfully');
  }

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 15 }}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}

        {admin && admin.addMovie.length > 0 && (

          <Box width={"70%"} display="flex" flexDirection={"column"}>

            <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2}>
              Added Movies
            </Typography>

            <Box margin={"auto"} display="flex" flexDirection={"column"} width="80%" >
              <List>

                {admin.addMovie.map((movie, index) => (


                  <ListItem sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 1 }}>

                    <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}> Movie: {movie.title}</ListItemText>

                    <IconButton onClick={() => handleDelete(movie._id)} color='error' >
                      <DeleteIcon color='red' />
                    </IconButton>

                  </ListItem>

                ))}
              </List>
            </Box>

          </Box>
        )}
      </Fragment>
      <ToastContainer />
    </Box>
  );
};

export default AdminProfile;