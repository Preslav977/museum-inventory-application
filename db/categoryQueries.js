const pool = require("./pool");

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

module.exports = {
  getCategoryList,
  getCategoryDetail,
  searchForCategoryIfExists,
  postCreateCategory,
  postDeleteCategory,
  postUpdateCategory,
};
