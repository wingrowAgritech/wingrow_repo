import React , {useState , useEffect } from 'react'
import './stallbooking.css'
import './Bookings.css'
import Dropdown from './Dropdown'
import Seats from './Seats'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../services/user.service'
import authHeader from '../../services/auth.headers'
import AuthService from '../../services/auth.service'


const StallBooking = ({setbookingDetails}) => {
const [Id, setId] = useState("")
const [Stalls , setStalls] = useState([])
const [availableStalls , setAvailableStalls] = useState([])
const [bookedStalls , setBookedStalls] = useState([])
const [numberOfSeats, setNumberOfSeats] = useState(0);
const [stallsdata, setStallsData] = useState([]);
const [location, setLocation] = useState("");
const user = AuthService.getCurrentUser()
const navigate = useNavigate()

useEffect(() => {
  UserService.getStallsData().then(
    (response) => {
      setStallsData(response.data);
    },
    (error) => {
      console.log(error)
      alert("An error occured")
    }
  );
}, []);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);


useEffect(() => {
  const temp = stallsdata.find(e=>e.location===Id)
    if(temp)
    {
    setAvailableStalls(temp.availablestalls)
    setStalls(temp.stalls)
    setLocation(temp.location)
    }
}, [stallsdata , Id])


const confirmBooking = async() => {
  try {
    const orderUrl = "http://localhost:4000/order";
    const {data} = await axios.post(orderUrl,{amount:100},{headers:authHeader()})
    initPayment(data.data)
  } catch (error) {
    console.log(error)
  }
};


const addSeat = async(ev) => {
  if(numberOfSeats && !ev.target.className.includes('disabled')) {
      const seatsToBook = parseInt(numberOfSeats, 20);
    if(bookedStalls.length <= seatsToBook) {
        if (bookedStalls.includes(ev.target.innerText)) {
            const newAvailable = bookedStalls.filter(seat => seat !== ev.target.innerText);
            setBookedStalls(newAvailable);
        } else if(bookedStalls.length < numberOfSeats) {
            setBookedStalls([...bookedStalls, ev.target.innerText]);
        } else if (bookedStalls.length === seatsToBook) {
            bookedStalls.shift();
            setBookedStalls([...bookedStalls, ev.target.innerText]);
        }
    }
  }
};


const initPayment = (data) => 
{
  let bookedStats = bookedStalls.toString()
     const options = { 
      key:process.env.KEY_ID,
      amount:data.amount,
      currency:data.currency,
      order_id:data.id,
      bookedStalls:bookedStats,
      description:"Wingrow Agritech",
      
      handler:async(response) =>{
          try {
              const verifyUrl = "http://localhost:4000/verify";
              const {data} = await axios.post(verifyUrl,response,{headers:authHeader()})
              const update = availableStalls.filter(function(obj) { return bookedStalls.indexOf(obj) === -1; });
              let orderId = data.orderId;

              if(location && update)
                {
                  const stallsUrl = "http://localhost:4000/stalls";
                  axios.put(stallsUrl , {location , availablestalls:update} , {headers:authHeader()})
                  .then(response => {
                    const {data} = response;
                    alert("Stalls booked succesfully")
                    setBookedStalls([])
                    setNumberOfSeats(0)
                    setAvailableStalls(data.availablestalls);
                    setbookingDetails({
                      farmer:`${user.firstname} ${user.lastname}`,
                      phone:user.phone,
                      stallAddress:location,
                      BookedStalls:bookedStalls,
                      Stallfare:1000,
                      paymentDetails:orderId
                    })
                    navigate('../ticket')
                  })
                  .catch(error => {
                      console.log(error)
                      alert("Stall booking failed")
                      setBookedStalls([])
                      setNumberOfSeats(0)
                  });
                }
          } catch (error) {
              console.log(error)
              setBookedStalls([])
              setNumberOfSeats(0)
          }
      },
      theme:{
          color:"#3399cc"
      }
     };
     const rzp = new window.Razorpay(options);
      rzp.open();
  } 

  const handleClick = (e) =>
  {
    setId(e.target.innerText)
  }


  return (
    <div className='main_stall'>
          <Link to="/farmers" className='goback_btn'>Go Back</Link>
        {(Stalls && availableStalls && bookedStalls)?
        <>
        <div className="dropdown">
          <Dropdown Data={stallsdata} handleClick={handleClick}/>
        </div>
        <div className='stallcontainer'>
          <p className='seatsinput'>How Many Stalls Would You Like to Book?</p>
          <br/>
          <input className='seatsinput' value={numberOfSeats} onChange={(ev) => setNumberOfSeats(ev.target.value)}/>
                <br/>
                {(Id!=="")?
                <>
                <br/>
                <div className='row_control'>
                <div className='stallrows'>

                  <div className='arow'>
                  <Seats values={Stalls.slice(0,16)}
                  availableSeats={availableStalls}
                  bookedSeats={bookedStalls}
                  addSeat={addSeat}/>
                  </div>

                  <div className='arow'>
                  <Seats  values={Stalls.slice(16,32)}
                  availableSeats={availableStalls}
                  bookedSeats={bookedStalls}
                  addSeat={addSeat}/>
                  </div>

                  <div className='arow'>
                  <Seats values={Stalls.slice(32,48)}
                  availableSeats={availableStalls}
                  bookedSeats={bookedStalls}
                  addSeat={addSeat}/>
                  </div>

                  <div className='arow'>
                  <Seats  values={Stalls.slice(48)}
                  availableSeats={availableStalls}
                  bookedSeats={bookedStalls}
                  addSeat={addSeat}/>
                  </div>
                  </div>

                </div>

                <div className='btns_container'>
                  <div className='bookeda' >
                      <div className='bookedseat'> Stalls</div>
                      <h4>Booked</h4>
                    </div>
                    <div className='availa'>
                      <div className='availseat'> Stalls</div>
                      <h4>Available</h4>
                    </div>
                    <div className='selectedseat'>
                      <div className='selectseat'> Stalls</div>
                      <h4>Selected</h4>
                    </div>
                </div>
                <br></br>
                <button className='confirmbtn' onClick={confirmBooking}>Book Stalls</button>
                </>:<h3 style={{overflow:"hidden" , margin:"auto"}}>Please select the market!</h3>}
                </div></>:<h2>Loading....</h2> }
    </div>
  )
}

export default StallBooking