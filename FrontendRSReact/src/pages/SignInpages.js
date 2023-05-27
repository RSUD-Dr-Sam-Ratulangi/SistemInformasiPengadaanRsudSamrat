import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../config/auth/authSlice";


const SignInpages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://rsudsamrat.site:8080/employee/login", {
        username: userName,
        password: password,
      })
      .then((res) => {
        const { username, id } = res.data;
        dispatch(login({ username, id }));
        axios
          .get(`http://rsudsamrat.site:8080/employee/${id}`)
          .then((response) => {
            const { role } = response.data;
            console.log(role);
          })
          .catch((err) => console.log(err));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "#CDE0C9",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.default",
            position: "relative",
            overflow: "hidden",
          }}
          >
          <div
            className="background-animation"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              opacity: 0.5,
              // background: "linear-gradient(45deg, #fff 10%, transparent 90%)",
              backgroundImage:
                "url('/path/to/your/illustration-or-animated-image.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "animateBackground 10s linear infinite",
            }}
            ></div>
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            value={userName}
            onChange={handleChangeUsername}
            autoComplete="email"
            autoFocus
            sx={{ bgcolor: "white" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            id="password"
            autoComplete="current-password"
            sx={{ bgcolor: "white" }}
          />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "black", color: "white" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "black" }}>
                {/* Forgot password? */}
              </Link>
            </Grid>
            <Grid item>
              Don't have an account?{" "}
              <Link href="#" variant="body2" sx={{ color: "black" }}>
                Sign Up
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInpages;
