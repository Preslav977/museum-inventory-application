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

// Museum queries

async function getCategoryList() {
  try {
    const { rows } = await pool.query("SELECT * FROM category");

    return rows;
  } catch (err) {
    console.error("Error retrieving categories", err);
    throw err;
  }
}

async function getCategoryDetail(category_id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM category WHERE category_id = $1",
      [category_id]
    );

    return rows;
  } catch (err) {
    console.error("Error retrieving category by ID", err);
    throw err;
  }
}

async function searchForCategoryIfExists(category_name) {
  try {
    const { rows } = await pool.query(
      "SELECT category_name FROM category WHERE category_name = $1",
      [category_name]
    );

    return rows;
  } catch (err) {
    console.error("Error retrieving category by NAME", err);
    throw err;
  }
}

async function postCreateCategory(category_name) {
  try {
    const query = await pool.query(
      "INSERT INTO category (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );

    return query.rows;
  } catch (err) {
    console.error("Error inserting row into category table ", err);
    throw err;
  }
}

async function postDeleteCategory(category_id) {
  try {
    await pool.query("DELETE FROM category WHERE category_id = $1", [
      category_id,
    ]);
  } catch (err) {
    console.error("Error deleting category by ID", err);
    throw err;
  }
}

async function postUpdateCategory(category_name, category_id) {
  try {
    const query = await pool.query(
      "UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING *",
      [category_name, category_id]
    );
    return query.rows;
  } catch (err) {
    console.error("Error updating category by NAME", err);
    throw err;
  }
}

// Category queries

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
  getCityList,
  getCityDetail,
  searchForCityIfExists,
  postCreateCity,
  postDeleteCity,
  postUpdateCity,
};
