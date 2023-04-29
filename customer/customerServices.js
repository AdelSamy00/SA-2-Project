import dotenv from 'dotenv';
import { Kafka, logLevel } from 'kafkajs';
import { Offer } from './models/offerTable.js';
dotenv.config();

const clientId = 'consumer-client';
const brokers = [`${process.env.KAFKA_HOST}`, 'localhost:9092'];
const topic = 'offers';
const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  logLevel: logLevel.INFO,
});
const customer = kafka.consumer({ groupId: 'consumer' });

export default class CustomerService {
  async consume() {
    await customer.connect();
    await customer.subscribe({ topic: topic });
    await customer.run({
      eachMessage: ({ message }) => {
        const value = JSON.parse(message.value);
        console.log('offer recieved');
        console.log(value);
        if (typeof value == 'object') {
          Offer.create({
            name: value.name,
            price: value.price,
            amount: value.amount,
          });
        } else {
          Offer.destroy({ where: { id: value } });
        }
      },
    });
  }

  async getAll() {
    const allProduct = await Offer.findAll();
    return allProduct;
  }
  async getProductByID(id) {
    const product = await Offer.findByPk(id);
    return product;
  }
}
