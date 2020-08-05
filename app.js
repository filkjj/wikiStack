const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const app = express();
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
const models = require('./models');
models.db.sync({force: true})

app.use("/wiki", wikiRoutes);
app.use("/user", userRoutes);

app.get("/", (req,res)=>{
    res.send("yo");
});


models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const port = 8008;

const intial = async function(){
    await models.db.sync();
    app.listen(port, ()=>{
        console.log(`APP LISTENING IN PORT ${port}`);
    });
}

intial();


