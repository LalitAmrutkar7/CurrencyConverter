import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmout'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'
import { Button } from 'bootstrap'
import { WebAssetSharp } from '@mui/icons-material'
import Weather from './components/Weather'


function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];



  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const handleButtonClick = () => {
    setIsModuleOpen(!isModuleOpen);
  };


  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "white",
    marginTop: "5%",
    textAlign: "center",
    color: "#222",
    minHeight: "10rem",
    borderRadius: 10,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "center",
  }

  return (
    <div>


      <Container maxWidth="md" sx={boxStyles}>
        <Typography variant='h5' sx={{ marginBottom: "1rem" }}>Currency Converter</Typography>
        <Grid container spacing={2} marginBottom={"1rem"}>
          <InputAmout />
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
          <SwitchCurrency />
          <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
        </Grid>

        {firstAmount ? (
          <Box sx={{ textAlign: "left", marginTop: "1rem" , marginBottom:"2rem"}}>
            <Typography component="span" >{firstAmount} {fromCurrency} = </Typography>
            <Typography component="span" variant='h5' sx={{ marginTop: "5px", fontWeight: "bold" }}>{(resultCurrency * firstAmount).toFixed(3)} {toCurrency}</Typography>
          </Box>
        ) : ""}


      <div >
        <button  background-color='black' onClick={handleButtonClick}  >Check Whether</button>
        {isModuleOpen && (<Weather/>)}
      </div> 

      </Container>

      

    </div>
    



  )

}

export default App
