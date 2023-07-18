import { Grid, InputAdornment, TextField } from "@mui/material"
import { useContext } from "react"
import { CurrencyContext } from "../context/CurrencyContext"

const InputAmout = () => {
  const { firstAmount, setFirstAmount} = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md>
      <TextField
        value={firstAmount}
        onChange={e => setFirstAmount(e.target.value)}
        label="Enter Amount Here"
        fullWidth
        InputProps={{
          type: "number",
          
        }}
      />
    </Grid>
  )
}

export default InputAmout