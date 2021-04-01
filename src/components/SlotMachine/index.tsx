import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { Row } from "../Content";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      padding: theme.spacing(10),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 7,
      backgroundColor: "#333",
      opacity: "0",
      border: "1px solid #000",
    },
    box: {
      display: "flex",
      paddingTop: "20px",
      gap: 15,
      marginTop: 20,
    },
    slots: {
      padding: "100px 50px",
    },
  })
);

type Props = {
  open: boolean;
  handleClose: () => void;
  getValues: ({ slot1, slot2, slot3, id, time }: Row) => void;
  handleBalance: (balance: number) => void;
};

const SlotMachine: FunctionComponent<Props> = ({
  open,
  handleClose,
  getValues,
  handleBalance,
}) => {
  const classes = useStyles();
  const [slot1, setSlot1] = useState<number>(0);
  const [slot2, setSlot2] = useState<number>(0);
  const [slot3, setSlot3] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const [spinDisabled, setSpinDisabled] = useState<boolean>(false);

  const balance = localStorage.getItem("balance");

  const randomNum = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const cleanDate = (date: string) => {
    return date.split(" ").slice(4, 5).join(" ");
  };

  useEffect(() => {
    if (
      (slot1 === slot2 || slot2 === slot3) &&
      slot1 !== 0 &&
      slot2 !== 0 &&
      slot3 !== 0
    ) {
      handleBalance(Number(balance) + 0.5);
    } else if (
      slot1 === slot2 &&
      slot2 === slot3 &&
      slot1 !== 0 &&
      slot2 !== 0 &&
      slot3 !== 0
    ) {
      handleBalance(Number(balance) + 5);
    } else if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
      handleBalance(Number(balance) + 10);
    }
  }, [slot1, slot2, slot3]);

  useEffect(() => {
    if (Number(balance) < 1) {
      setSpinDisabled(true);
    } else {
      setSpinDisabled(false);
    }
  }, [balance]);

  const spin = () => {
    setSlot1(randomNum());
    setSlot2(randomNum());
    setSlot3(randomNum());
    setId(id + 1);
    handleBalance(Number(balance) - 1);
  };

  const debug = () => {
    setSlot1(7);
    setSlot2(7);
    setSlot3(7);
    setId(id + 1);
    handleBalance(Number(balance) + 10);
  };

  useEffect(() => {
    if (slot1 > 0 && slot2 > 0 && slot3 > 0) {
      getValues({
        slot1,
        slot2,
        slot3,
        id,
        time: cleanDate(new Date(Date.now()).toUTCString()),
      });
    }
  }, [id, slot1, slot2, slot3]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <Paper>
                  <Box className={classes.slots}>
                    <Typography variant="h4">{slot1}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Box className={classes.slots}>
                    <Typography variant="h4">{slot2}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Box className={classes.slots}>
                    <Typography variant="h4">{slot3}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box className={classes.box}>
              <Button
                disabled={spinDisabled}
                onClick={spin}
                variant="contained"
                color="primary"
              >
                Spin
              </Button>
              <Button onClick={debug} variant="contained" color="primary">
                Debug
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleClose();
                  //   setSlot1(0);
                  //   setSlot2(0);
                  //   setSlot3(0);
                }}
              >
                Close
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default SlotMachine;
