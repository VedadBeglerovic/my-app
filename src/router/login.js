import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './login.css'
export default function Login(props) {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const login = () => {
    props.setLoggedInUsername(username);
  };

  return (
    <div class="center">
      <TextField id="standard-basic" label="Standard" onChange={handleChange} />
      <Button className="loginBtn" onClick={login}>Login</Button>
    </div>
  );
}
