import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: "100px",
    marginTop: "50px",
    marginBottom: "100px",
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const [signInModal, setSignInModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(10);

  useEffect(() => {
    if (!localStorage.getItem("balance")) {
      localStorage.setItem("balance", `${20.55}`);
    }
  }, [balance]);

  useEffect(() => {
    setBalance(Number(localStorage.getItem("balance")!));
  }, []);

  const handleBalance = (newBalance: number) => {
    setBalance(newBalance);
    localStorage.setItem("balance", `${newBalance}`);
  };

  return (
    <>
      <Header balance={balance} signIn={() => setSignInModal(true)} />
      <Modal open={signInModal} handleClose={() => setSignInModal(false)} />
      <Container className={classes.root}>
        <Content handleBalance={handleBalance} />
      </Container>
      <Footer />
    </>
  );
};

export default App;
