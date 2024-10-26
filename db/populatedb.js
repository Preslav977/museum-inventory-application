require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS category (category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR(255));

CREATE TABLE IF NOT EXISTS city (city_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, city_name VARCHAR(255), city_image_url VARCHAR(255));

CREATE TABLE IF NOT EXISTS museum (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255), history VARCHAR(600), image_url VARCHAR(255), category_id INTEGER REFERENCES category (category_id) ON DELETE SET NULL, city_id INTEGER REFERENCES city (city_id) ON DELETE SET NULL);


INSERT INTO category (category_name) VALUES ('History');

INSERT INTO city (city_name, city_image_url) VALUES ('Pleven', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/%D0%9F%D0%BB%D0%B5%D0%B2%D0%B5%D0%BD_%D1%86%D0%B5%D0%BD%D1%82%D1%8A%D1%80.jpg
');

INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ('Panorama', 'Pleven Epopee 1877, more commonly known as Pleven Panorama, is a panorama located in Pleven, Bulgaria, that depicts the events of the Russian-Turkish War of 1877–78, specifically the five-month Siege of Plevna (Pleven Epopee) which made the city internationally famous and which contributed to the Liberation of Bulgaria after five centuries of Ottoman rule. The panorama was created by 13 Russian and Bulgarian artists and was constructed in honor of the 100th anniversary of the Pleven Epopee.', 'https://www.pleven.bg/uploads/posts/img_1642-panorama-plevenska-epopeya.jpg', 1, 1);


INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ('Pleven Regional Historical Museum', 'The Pleven Regional Historical Museum has its roots in the local Archaeological Society founded in 1903, the goals of which included the creation of a museum, as well as the discovery and research of historical monuments in the town and the region. The first excavations of the Roman fortress of Storgosia in Kaylaka Park in May 1905 were organized and carried out by the society under the direction of Yurdan Kantardzhiev. ', 'https://www.pleven.bg/uploads/posts/img_1.jpg', 1, 1);

INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ('Wine Museum', 'The Wine Museum is a museum of wine and viticulture located in Pleven, a city in north central Bulgaria. Opened on 17 September 2008, the museum occupies a natural cave in Plevens Kaylaka park, about 5 kilometres from the city centre. The museum was the result of a collaboration between Bulgarian and French architects, designers and oenologists, as well as curators from the Pleven Panorama and the Pleven Regional Historical Museum.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAtvnC4UaPbsvft6Rp0fWleth-ayCLM1Dfg&s', 1, 1);


INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ('House museum “Tsar Alexander II Liberator
', 'In 1907, the house-museum “Tsar Alexander II Liberator” was established after the initiative of Committee “Tsar Alexander II Liberator”. On 11th of December, 1877 in this house owned by Pleven merchant Ivan Vatsov, the Russian emperor Alexander II was welcomed. Here he was given a letter of appreciation by Pleven citizens and in the presence of the great prince Nikolay Nikolaevich, Romanian prince Carol I and Russian military minister Milyutin had a meeting with the captivated Turkish marshal Osman Pasha. ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnE7qU_GSrTMLnmeiC5AKdi3NUIPL59EjedQ&s', 1, 1);


INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ('House-museum His Royal Majesty Carol I town of Pordim.', 'The exposition of house-museum His Royal Majesty Carol I illustrates the participation of Romania in the Russian-Turkish War 1877-1878 and the function of Romanian army headquarters when in 1877 the Romanian prince Carol I resided in the town of Pordim. The prolific exposition presents military uniforms for the different branches of the Romanian army. The uniforms were donated by the Romanian Ministry of War.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzidpyb8WKmAeiWj4s2vXVeNgMebmhaTJwBQ&s', 1, 1);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  await client.query(SQL);

  await client.end();

  console.log("done");
}

main();
