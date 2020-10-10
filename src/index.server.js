const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialdata')

const app = express();
const port = process.env.PORT || 2000




const conURL = 'mongodb+srv://admin:root@cluster0.uakow.mongodb.net/e-commerce?retryWrites=true&w=majority'

mongoose.connect(conURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('database connected');
})

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api' , userRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , cartRoutes);
app.use('/api' , initialDataRoutes)

app.listen(port, () => console.log(`listening ${port}` ))

