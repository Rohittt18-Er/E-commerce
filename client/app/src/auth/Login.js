import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
} from "../redux/store/slices/authSlice";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Loader from "../utils/Loader";
import bg from "../assets/bg/abcd.webp";
import bgimg from "../assets/bg/backimg.jpg";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [doNotLogout, setDoNotLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    data.doNotLogout = doNotLogout;
    try {
      const response = await axios.post(
        `https://e-commerce-1-76i4.onrender.com/api/v1/user/login`,
        data
      );
      toast.success(response.data.message);
      dispatch(loginSuccess(response.data));
      navigate("/")
      // window.location.href = "/";
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                height: "50vh",
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
                            checked={doNotLogout}
                            onChange={() => setDoNotLogout(!doNotLogout)}
                          />
                        }
                        label="Do not logout"
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
                      {loading ? <Loader /> : "Sign in"}
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
  );
}
