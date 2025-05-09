import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormGroup,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useData } from "../../features/Context.jsx";
import DataServices from "../../features/DataServices.js";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { user, setUser } = useData();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data } = (await DataServices.signin(formData)) ?? {};
    setIsLoading(false);
    if (data?.data && data?.status === "success") {
      setUser(data?.data);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="max-w-7xl flex mx-auto justify-between items-center flex-col py-5 relative">
      <Card className="w-md p-5 !bg-black !text-white !pb-10">
        <CardContent className="flex flex-col gap-5 items-center">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-5">
              <img src={Logo} alt="Logo" />
              <span>BAKER'S BOT</span>
            </div>
            <span className="text-center">
              This login page is for customers who have purchased Baker's Bot.
              If you're not a customer yet, login access is provided upon
              purchase completion.
            </span>
          </div>
          <h1 className="w-full text-center text-2xl text-bold">Login</h1>
          <FormGroup className="flex flex-col gap-2 w-xs">
            <InputLabel htmlFor="username" className="!text-white">
              Username
            </InputLabel>
            <OutlinedInput
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              classes={{
                input:
                  "bg-gray-800 !text-white !border-grey-400 rounded-[8px] !border-2",
              }}
            />
          </FormGroup>
          <FormGroup className="flex flex-col gap-2 w-xs">
            <InputLabel htmlFor="password" className="!text-white">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              classes={{
                input:
                  "bg-gray-800 !text-white !border-grey-400 rounded-[8px] !border-2",
              }}
            />
          </FormGroup>
          <Button
            disabled={isLoading}
            className="w-xs !py-3"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5"></div>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </CardContent>
        <CardActions className="flex flex-col gap-5">
          <Link to="/forget-pass">Forgot Password?</Link>
          <Link to="/forget-username">Forgot Username?</Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
