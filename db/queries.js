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

// Museum queries

async function getCategoryList() {
  const { rows } = await pool.query("SELECT * FROM category");

  return rows;
}

async function getCategoryDetail(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM category WHERE category_id = $1",
    [category_id]
  );

  return rows;
}

async function searchForCategoryIfExists(category_name) {
  const { rows } = await pool.query(
    "SELECT category_name FROM category WHERE category_name = $1",
    [category_name]
  );

  return rows;
}

async function postCreateCategory(category_name) {
  await pool.query("INSERT INTO category (category_name) VALUES ($1)", [
    category_name,
  ]);
}

async function postDeleteCategory(category_id) {
  await pool.query("DELETE FROM category WHERE category_id = $1", [
    category_id,
  ]);
}

async function postUpdateCategory(category_name, category_id) {
  await pool.query(
    "UPDATE category SET category_name = $1 WHERE category_id = $2",
    [category_name, category_id]
  );
}

// Category queries

module.exports = {
  getAll,
  getMuseumList,
  getMuseumDetail,
  postCreateMuseum,
  searchForMuseumIfExists,
  checkIfMuseumHasAnyRelationships,
  deleteMuseumIfNoRelationships,
  postUpdateMuseum,
  getCategoryList,
  getCategoryDetail,
  searchForCategoryIfExists,
  postCreateCategory,
  postDeleteCategory,
  postUpdateCategory,
};
