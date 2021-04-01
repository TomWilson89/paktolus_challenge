import * as React from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import SlotMachine from "../SlotMachine";
import { Button } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "slot1",
    headerName: "Slot 1",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "slot2",
    headerName: "Slot 2",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "slot3",
    headerName: "Slot 3",
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  { field: "time", headerName: "Time", width: 300 },
];

export type Row = {
  slot1: number;
  slot2: number;
  slot3: number;
  id: number;
  time: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "space-around",
      justifyContent: "center",
      // height: 650,
      width: "100",
      flexDirection: "column",
      gap: 20,
    },
    button: {
      width: "25%",
      margin: "0 auto",
    },
  })
);

type Props = {
  handleBalance: (balance: number) => void;
};

const DataTable: React.FunctionComponent<Props> = ({ handleBalance }) => {
  const [gameModal, setGameModal] = React.useState<boolean>(false);
  const [rows, setRow] = React.useState<Row[]>([]);
  const classes = useStyles();

  const handleChange = (data: Row) => {
    setRow((prevInfo) => [...prevInfo, data]);
  };

  return (
    <div className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight={true}
        pagination
        rowsPerPageOptions={[5, 10, 20]}
        {...rows}
      />
      <Button
        className={classes.button}
        onClick={() => setGameModal(true)}
        variant="contained"
        color="primary"
      >
        Start Game
      </Button>
      <SlotMachine
        handleBalance={handleBalance}
        getValues={handleChange}
        open={gameModal}
        handleClose={() => setGameModal(false)}
      />
    </div>
  );
};

export default DataTable;
