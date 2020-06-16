const sql = require("./db.js");

// constructor
const Genre = function(genre) {
  this.title = genre.email;
  this.description = genre.name;
};

Genre.create = (newGenre, result) => {
  sql.query("INSERT INTO customers SET ?", newGenre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};