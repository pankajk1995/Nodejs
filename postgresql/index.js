const express = require('express');
const app = express();
const Pool  = require('pg').Pool ;
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set the port
const PORT =  3000;

// Set up PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud',    // replace with your database
    password: '123456',  // replace with your password
    port: 5432,  
});

// Test the connection to PostgreSQL
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error in connection', err);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err);
    }
    console.log('>>>>>>>>> Database connected >>>>>>>>>>>>>>>');
  });
});

//use Middleware
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/static',express.static('static'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//GET DATA
app.get('/',async(req,res)=>{
    const data= await pool.query(`SELECT * FROM todo ORDER BY date`) // using for show all data 
    res.render('index',{data:data.rows})
})
//SEARCH
app.post('/filter',async(req,res)=>{
    const searchDate=req.body.date
    const data= await pool.query(`SELECT * FROM todo where date = '${searchDate}'`)// using for filter
    res.render('filter',{data:data.rows})
})
//ADD DATA
app.post('/addTodo', async (req, res) => {
    const { todo, date } = req.body;
    console.log('Received todo:', todo, 'Date:', date); // Debugging line

    try {
        const result = await pool.query('INSERT INTO todo (todo, date) VALUES ($1, $2) RETURNING *', [todo, date]); // add data 
        console.log('Inserted todo:', result.rows[0]);
        res.redirect('/');
    } catch (error) {
        console.error('Error in adding data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//UPDATE DATA
app.get('/edit/:id',async(req,res)=>{
    const id=req.params.id;
    const data= await pool.query('SELECT * FROM todo WHERE id= $1',[id])// get  data
    res.render('edit',{data:data.rows})
})

app.post('/update/:id',async(req,res)=>{
    const id = req.params.id
    const {todo,date}= req.body
    try {
        await pool.query(`UPDATE todo SET todo = $1,date=$2 WHERE id= $3`,[todo,date,id])//update data
        res.redirect('/')
    } catch (error) {
        console.log('error')
        res.status(500).json({error:'internal server error'})
    }
})

// Delete 
app.get('/delete/:id', async(req,res)=>{
    const id= req.params.id
    await pool.query(`DELETE FROM todo WHERE id = $1`,[id]) // delete data
    res.redirect('/')
} )

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
