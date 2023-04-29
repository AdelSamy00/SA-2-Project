import express from 'express';
import CustomerService from './customerServices.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const service = new CustomerService();
service
  .consume()
  .then(() => {
    console.log('ready to consume');
  })
  .catch((err) => console.log(err));

app.get('/customer/getAll', async (req, res) => {
  const allProduct = await service.getAll();
  res.send(allProduct);
});

app.get('/customer/get/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.getProductByID(id);
  res.send(product);
});

app.listen(5000, (req, res) => {
  console.log('server running on port 5000.');
});
