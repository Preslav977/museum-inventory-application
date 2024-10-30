const pool = require("./pool");

async function getMuseumList() {
  try {
    const { rows } = await pool.query("SELECT * FROM museum");

    return rows;
  } catch (err) {
    console.error("Error retrieving all museums", err);
    throw err;
  }
}

async function getMuseumDetail(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM museum WHERE id = $1", [
      id,
    ]);

    return rows;
  } catch (err) {
    console.error("Error retrieving museum by ID", err);
    throw err;
  }
}

async function searchForMuseumIfExists(name) {
  try {
    const { rows } = await pool.query(
      "SELECT name FROM museum WHERE name = $1",
      [name]
    );

    return rows;
  } catch (err) {
    console.error("Error retrieving museum by NAME", err);
    throw err;
  }
}

async function postCreateMuseum(
  name,
  history,
  image_url,
  category_id,
  city_id
) {
  try {
    const query = await pool.query(
      "INSERT INTO museum (name, history, image_url, category_id, city_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, history, image_url, category_id, city_id]
    );

    return query.rows;
  } catch (err) {
    console.error("Error inserting a row into museum table", err);
    throw err;
  }
}

async function checkIfMuseumHasAnyRelationships(id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM museum WHERE id = ($1) AND category_id IS NOT NULL OR city_id IS NOT NULL",
      [id]
    );

    return rows;
  } catch (err) {
    console.error(
      "Error retrieving museum relationships by category ID or city ID",
      err
    );
    throw err;
  }
}

async function deleteMuseumIfNoRelationships(id) {
  try {
    await pool.query("DELETE FROM museum WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting museum by ID", err);
    throw err;
  }
}

async function postUpdateMuseum(
  name,
  history,
  image_url,
  category_id,
  city_id,
  id
) {
  try {
    const query = await pool.query(
      "UPDATE museum SET name = $1, history = $2, image_url = $3, category_id = $4, city_id = $5 WHERE id = $6 AND category_id IS NOT NULL AND city_id IS NOT NULL RETURNING *",
      [name, history, image_url, category_id, city_id, id]
    );

    return query.rows;
  } catch (err) {
    console.error(
      "Error updating museum by NAME, HISTORY, IMAGE_URL, CATEGORY_ID, CITY_ID",
      err
    );
    throw err;
  }
}

module.exports = {
  getMuseumList,
  getMuseumDetail,
  postCreateMuseum,
  searchForMuseumIfExists,
  checkIfMuseumHasAnyRelationships,
  deleteMuseumIfNoRelationships,
  postUpdateMuseum,
};
