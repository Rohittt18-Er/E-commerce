import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import bg from "../assets/bg/abcd.webp";
import bgimg from "../assets/bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [donotLogOut, setdonotLogOut] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    setLoading(true);
    data.doNotLogOut = donotLogOut;
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        data
      );
      console.log(data);
      // const { token } = response.data;
      // console.log(token);
      toast.success(response.data.message);
      // localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          minHeight: "100vh",
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
                  height: "63vh",
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
                      <Avatar sx={{ bgcolor: "#ffffff" }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
                        Sign In
                      </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="email"
                        autoComplete="email"
                        {...register("email", { required: true })}
                        error={!!errors.email}
                        helperText={errors.email ? "Email is required" : ""}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={
                          errors.password ? "Password is required" : ""
                        }
                        sx={{ mb: 2 }}
                      />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={donotLogOut}
                              onChange={() => setdonotLogOut(!donotLogOut)}
                            />
                          }
                          label="DO NOT LOG"
                        />
                        <Typography
                          variant="body2"
                          sx={{ cursor: "pointer" }}
                          onClick={() => navigate("/reset-password")}
                        >
                          Forgot password?
                        </Typography>
                      </Stack>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 2, borderRadius: "28px", bgcolor: "#FF9A01" }}
                      >
                        {loading ? <Loader /> : "  Sign in"}
                      </Button>
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          Not registered yet?{" "}
                          <span
                            style={{ color: "#beb4fb", cursor: "pointer" }}
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Create an Account
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
