import { Box, Button } from "@mui/material";
import Paymentinfo from "../components/Paymentinfo";
import { getFetch, postFetch } from "../fetch";

/**
 * Page component for when user is buying a ticket.
 */


let voucher = 0;
export default function BuyTicketsPage() {
  let email = sessionStorage.getItem("currentEmail");
  const isLoggedIn = email !== null && email !== "null";

  //Returns user to homepage when payment cancelled
  function cancelHandler() {
    window.location.pathway = "/";
    window.location.href = window.location.pathway;
  }

  //Performs all communication between server and client when a payment is submitted
  async function SubmitHander() {
    let paymentform;
    let cvv;
    let cardName;
    let expiryDate;
    let postal;
    let type;
    let cardnum;

    if (isLoggedIn) {
      //Verify credentials with server
      let user = await getFetch("http://localhost:8080/RegisteredUser/" + email); // password??

      if (user["error"] === "Internal Server Error") {
        alert(user.message);
        return -1;
      }

      console.log(user);
      //make a fetch request based on email
      cvv = user.paymentCards[0].cvv;
      cardName = user.paymentCards[0].nameOfHolder;
      expiryDate = user.paymentCards[0].expiryDate;
      postal = user.paymentCards[0].billingPostal;
      type = user.paymentCards[0].type;
      cardnum = user.paymentCards[0].number;
      //calculate total amount of vouchers
    } else {
      paymentform = document.getElementById("Paymentinfo");
      cvv = paymentform.csv.value;
      cardName = paymentform.cardname.value;
      expiryDate = paymentform.cardexpiry.value;
      postal = paymentform.postal.value;
      type = paymentform.cardtype.value;
      cardnum = paymentform.cardnum.value;
      email = document.getElementById("emailForm").email.value;
    }
    let ticketObject = [];
    let tickets = JSON.parse(sessionStorage.getItem("selectedSeats"));
    let currentShowtimeId = JSON.parse(
      sessionStorage.getItem("currentShowtimeId")
    );

    tickets.forEach((element) => {
      ticketObject.push({
        rowNum: element[0],
        seatNum: element[1],
      });
    });

    let SubmitObject = {
      email: email,
      showtimeId: currentShowtimeId,
      seats: ticketObject,
      paymentCard: {
        cvv: cvv,
        nameOfHolder: cardName,
        expiryDate: expiryDate,
        billingPostal: postal,
        type: type,
        number: cardnum,
      },

      cancellationCreditCode:
        document.getElementById("voucherForm").voucher.value,
    };

    console.log(SubmitObject);

    // async function getResponse() {
      let response = await postFetch(
        "http://localhost:8080/transaction/tickets",
        SubmitObject
      );

      console.log(response);

      // if (response["status"] === 400 || 500) {
      if (response["error"] === "Internal Server Error") {
        alert(response.message);
        return -1;
      } else {
        console.log("Successful tickets bought");
        alert("Success! You will shortly get an email with your tickets.");
        window.location.pathway = '/';
        window.location.href = window.location.pathway;
      }
    // }
    // getResponse();
  }
  return (
    <div>
              <Box sx={{margin: "1rem"}} >
      <h1> Ticket Shopping Cart </h1>
      <h2> You are buying tickets for</h2>
      <p>Movie: {[sessionStorage.getItem("currentMovie")]}</p>
      <p>Theatre: {[sessionStorage.getItem("selectedTheatre")]}</p>
      <p>Show time: {[sessionStorage.getItem("selectedShowtime")]}</p>
      <p>Seats: {[sessionStorage.getItem("selectedSeats")]}</p>
      <p>
        <b>
          Your total:{" "}
          {JSON.parse(sessionStorage.getItem("selectedSeats")).length * 9.99 -
            voucher}{" "}
        </b>
      </p>
        </Box>
      {isLoggedIn ? (
        <div>We already have your payment information on file, {email}</div>
      ) : (
        <>
          <Box sx={{ margin: "1rem" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              id="emailForm"
              class="card"
            >
              <label>Enter your email: </label>
              <input
                type="text"
                id="email"
                name="email"
                required
              ></input>
            </form>
          </Box>
          <Box sx={{ margin: "1rem" }}>
            <Paymentinfo />
          </Box>
        </>
      )}
      <Box sx={{ margin: "1rem" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          id="voucherForm"
          class="card"
        >
          <label>
            Voucher info (will be subtracted from the total above):{" "}
          </label>
          <input
            type="text"
            id="voucher"
            name="voucher"
          ></input>
        </form>
      </Box>
      <Button
        variant="contained"
        class="btn"
        margin="1rem"
        onClick={SubmitHander}
      >
        Buy Tickets
      </Button>
      <button
        className="btn btn--alt"
        onClick={cancelHandler}
      >Cancel</button>
    </div>
  );
}
