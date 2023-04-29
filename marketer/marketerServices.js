import dotenv from 'dotenv';
import { Kafka, logLevel, Partitioners } from 'kafkajs';
dotenv.config();

const clientId = 'producer-client';
const brokers = [`${process.env.KAFKA_HOST}`];
const topic = 'offers';
const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  logLevel: logLevel.DEBUG,
  createPartitioner: Partitioners.LegacyPartitioner,
});

const producer = kafka.producer();

export default class MarketerServices {
  async createOffer(name, amount, price) {
    const offer = {
      name: name,
      amount: amount,
      price: price,
    };
    console.log(offer);
    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(offer) }],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteOffer(id) {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [{ value: id }],
    });
  }
}
