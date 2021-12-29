import {useState, useEffect } from 'react'
import { Container, Grid, makeStyles, CircularProgress, Slider, Paper, TextField, Typography,FormControl, Radio, FormControlLabel, RadioGroup} from '@material-ui/core';
import BootcampCard from '../components/BootcampCard';

import axios from 'axios';
 const useStyles = makeStyles({
     root:{
         marginTop: 20,
     },
     loader:{
         width: '100%',
         dispaly: 'flex',
         justifyContent: 'center',
         alignItems: 'center',

     },
     paper:{
       marginBottom : "1rem",
       padding: "13px",

     },
     filters:{
         padding: "0 1.5rem",
     },
     priceRangeInputs: {
         display: "flex",
         justifyContent: "space-between",
     },
 })


const BootcampsPage = () => {
    // MAterial-ui styles
const classes = useStyles();

    //Component State
    const [bootcamps, setBootcamps] = useState([]);
    const [loading, setLoading] = useState (false);
//Side Effects
useEffect(()=>{
    let cancel;

const fetchData = async() => {
    setLoading(true);
    try{
        const { data } = await axios({
            method: "GET",
            url: `/api/v1/bootcamps`,
            cancelToken: new axios.cancelToken((c)=> cancel = c)

        })

        setBootcamps(data.data);
        setLoading(false);
    }catch(error){
        console.log(error.response.data);
    }
}
fetchData();
}, [])
    return (
       <Container className={classes.root}>

{/*Bootcamps filtering and sorting*/}
<Paper className={classes.paper}>
    <Grid container>
        <Grid item xs={12} sm={6}></Grid>
        <Typography gutterBottom>
            Filters
            </Typography>

            <div className={classes.filters}>
                <Slider
                
                min={0}
                max={100}
                />
<div className={classes.priceRangeInputs}>
    <TextField
    size="small"
    id="lower"
    label="Min Price"
    variant="outlined"
    type='number'
    disabled={loading}
    value={0}
    />


<TextField
    size="small"
    id="upper"
    label="Max Price"
    variant="outlined"
    type='number'
    disabled={loading}
    value={75}
    />
</div>
               
            </div>

        

    </Grid>
<Grid item xs={12} sm={6}>
    <Typography gutterBottom>
        Sort By
    </Typography>

    <FormControl component="fieldset" className={classes.filters}>
        <RadioGroup aria-label="price=oder"
        name="price-order">
<FormControlLabel
disabled={loading}
control={<Radio/>}
label="Price: Highest - lowest"/>

<FormControlLabel
disabled={loading}
control={<Radio/>}
label="Price: Lowest - Highest"/>

        </RadioGroup>

    </FormControl>

</Grid>

</Paper>




{/*Bootcamps listing*/}
           <Grid container spacing={2}>
               {loading ? (
                   <div className={classes.loader}>
                       <CircularProgress size="3rem" thickness={5} />

                   </div>
               ) : (
                   bootcamps.map(bootcamp =>(
                       <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3}>
                         <BootcampCard bootcamp ={bootcamp}/>  
                           </Grid>
                   ))

               )}
               </Grid>
       </Container>
    )
}

export default BootcampsPage
