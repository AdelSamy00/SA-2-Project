import express from 'express';
import MarketerServices from './marketerServices.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const service = new MarketerServices();

app.post('/marketer/createOffer', async (req, res) => {
  const { name, amount, price } = req.body;
  console.log(name, amount, price);
  await service.createOffer(name, amount, price);
  res.send(`Produced succssesfully`);
});
app.delete('/marketer/deleteOffer/:id', async (req, res) => {
  const { id } = req.params;
  await service.deleteOffer(id);
  res.send('Produced succssesfully');
});

app.listen(5001, (req, res) => {
  console.log('marketer running on port 5001.');
});
