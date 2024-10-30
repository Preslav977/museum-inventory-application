const pool = require("./pool");

async function getCityList() {
  try {
    const { rows } = await pool.query("SELECT * FROM city");

    return rows;
  } catch (err) {
    console.error("Error retrieving cities", err);
    throw err;
  }
}

async function getCityDetail(city_id) {
  try {
    const { rows } = await pool.query("SELECT * FROM city WHERE city_id = $1", [
      city_id,
    ]);

    return rows;
  } catch (err) {
    console.error("Error getting city by ID", err);
    throw err;
  }
}

async function searchForCityIfExists(city_name) {
  try {
    const { rows } = await pool.query(
      "SELECT city_name FROM city WHERE city_name = $1",
      [city_name]
    );

    return rows;
  } catch (err) {
    console.error("Error retrieving city by NAME", err);
    throw err;
  }
}

async function postCreateCity(city_name, city_image_url) {
  try {
    const query = await pool.query(
      "INSERT INTO city (city_name, city_image_url) VALUES ($1, $2) RETURNING *",
      [city_name, city_image_url]
    );

    return query.rows;
  } catch (err) {
    console.error("Error inserting row into city table", err);
    throw err;
  }
}

async function postDeleteCity(city_id) {
  try {
    await pool.query("DELETE FROM city WHERE city_id = $1", [city_id]);
  } catch (err) {
    console.error("Error deleting city by ID", err);
    throw err;
  }
}

async function postUpdateCity(city_name, city_image_url, city_id) {
  try {
    const query = await pool.query(
      "UPDATE city SET city_name = $1, city_image_url = $2 WHERE city_id = $3 RETURNING *",
      [city_name, city_image_url, city_id]
    );

    return query.rows;
  } catch (err) {
    console.error("Error updating city by NAME, IMG_URL ", err);
    throw err;
  }
}

module.exports = {
  getCityList,
  getCityDetail,
  searchForCityIfExists,
  postCreateCity,
  postDeleteCity,
  postUpdateCity,
};
