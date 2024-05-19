import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../assets/bg/signin.svg";
import bgimg from "../assets/bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setOpen(true);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        data
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error("User Already exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f5f5",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  height: "55vh",
                  marginTop: "40px",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box
                style={{
                  backgroundColor: "#3b33d5",
                  borderRadius: "8px",
                  padding: "40px",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container maxWidth="sm">
                    <Box sx={{ textAlign: "center" }}>
                      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                        Create Accounts
                      </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        {...register("name", { required: "Name is required" })}
                        error={errors.name}
                        helperText={errors.name && errors.name.message}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        error={errors.lastName}
                        helperText={errors.lastName && errors.lastName.message}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        })}
                        error={errors.email}
                        helperText={errors.email && errors.email.message}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        error={errors.password}
                        helperText={errors.password && errors.password.message}
                        sx={{ mb: 2 }}
                      />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                      ></Stack>

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 2, borderRadius: "28px", bgcolor: "#FF9A01" }}
                      >
                        {loading ? <Loader /> : " Sign Up"}
                      </Button>
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          Already has registered?{" "}
                          <span
                            style={{ color: "#beb4fb", cursor: "pointer" }}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Go to login
                          </span>
                        </Typography>
                      </Stack>
                    </form>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
