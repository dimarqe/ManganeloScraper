const pool = require("../config/dbConnection.js");

// constructor
class Genre {
  constructor(genre) {
    this.title = genre.email;
    this.description = genre.name;
  }
  
  static create(newGenre, result) {
    sqlQuery = "I forgot everything from database";

    pool.query(sqlQuery, newGenre, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("added genre: ", { id: res.insertId, newGenre });
      result(null, { id: res.insertId, newGenre });
    });
  }
}

