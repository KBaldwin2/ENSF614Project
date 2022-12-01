import classes from "../styles/Movie.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import {useState} from 'react';
let seatList = [];
let buttonVariant = "";

const [selected, setselected] = useState(second);
function Seat(props) {
  function seatSelectHandler() {
    console.log(props.seatNum);
    seatList.push(props.seatNum);
    sessionStorage.selectedSeats = JSON.stringify(seatList);
    console.log(sessionStorage.selectedSeats);
  }

  function determineButton() {
    if (props.isAvailable) {
      buttonVariant = "outlined";
    } else {
      buttonVariant = "disabled";
    }
  }

  determineButton();
  return (
    <Button
      variant={buttonVariant}
      onClick={seatSelectHandler}
      sx={{ width: "1em" }}
    >
      {props.seatNum}
    </Button>
    // <Card sx={{}} onClick={seatSelectHandler}>
    //     <CardActionArea>
    //         <CardContent>
    //             <p>{props.seatNum}</p>
    //             <p>Row {props.seatRow}</p>
    //             <p>{props.available}</p>
    //         </CardContent>
    //         {/* <CardMedia
    //             component = "img"
    //             image={props.image}

    //             /> */}
    //     </CardActionArea>
    //     </Card>
  );
}
export default Seat;
