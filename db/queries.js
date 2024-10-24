const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query(
    "SELECT * FROM museum LEFT JOIN category ON(id=category.category_id) LEFT JOIN city ON(id=city.city_id)"
  );

  return rows;
}

async function getMuseumList() {
  const { rows } = await pool.query("SELECT * FROM museum");

  return rows;
}

async function getMuseumDetail(id) {
  const { rows } = await pool.query("SELECT * FROM museum WHERE id = $1", [id]);

  return rows;
}

async function searchForMuseumIfExists(name) {
  const { rows } = await pool.query("SELECT name FROM museum WHERE name = $1", [
    name,
  ]);

  return rows;
}

async function postCreateMuseum(
  name,
  history,
  image_url,
  category_id,
  city_id
) {
  await pool.query(
    "INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ($1, $2, $3, $4, $5)",
    [name, history, image_url, category_id, city_id]
  );
}

async function checkIfMuseumHasAnyRelationships(id) {
  const { rows } = await pool.query(
    "SELECT * FROM museum WHERE id = ($1) AND category_id IS NOT NULL AND city_id IS NOT NULL",
    [id]
  );

  return rows;
}

async function deleteMuseumIfNoRelationships(id) {
  await pool.query(
    "DELETE FROM museum WHERE id = $1 AND category_id IS NULL and city_id IS NULL",
    [id]
  );
}

async function postUpdateMuseum(
  name,
  history,
  image_url,
  category_id,
  city_id,
  id
) {
  await pool.query(
    "UPDATE museum SET name = $1, history = $2, image_url = $3, category_id = $4, city_id = $5 WHERE id = $6 AND category_id IS NOT NULL AND city_id IS NOT NULL",
    [name, history, image_url, category_id, city_id, id]
  );
}

module.exports = {
  getAll,
  getMuseumList,
  getMuseumDetail,
  postCreateMuseum,
  searchForMuseumIfExists,
  checkIfMuseumHasAnyRelationships,
  deleteMuseumIfNoRelationships,
  postUpdateMuseum,
};
