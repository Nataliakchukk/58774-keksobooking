const {MongoClient} = require(`mongodb`);
const assert = require(`assert`);

const url = `mongodb://localhost:27017`;

const offers = [
  {title: `Большая уютная квартира`},
  {title: `Маленькая неуютная квартира`},
  {title: `Огромный прекрасный дворец`},
  {title: `Маленький ужасный дворец`},
  {title: `Некрасивый негостеприимный домик`},
  {title: `Уютное бунгало далеко от моря`},
  {title: `Неуютное бунгало по колено в воде`},
];

const connectAndRead = async() => {
  const client = await MongoClient.connect(url);
  const db = client.db(`offers`);

  const collection = db.collection(`find`);
  const result = await collection.insertMany(offers);
  assert.equal(7, result.insertedCount);

  const itemCursor = collection.find({title: `Большая уютная квартира`});
  const items = await itemCursor.limit(2).toArray();
  assert.equal(1, items.length);
  client.close();
};


connectAndRead().catch((e) => {
  throw e;
});
