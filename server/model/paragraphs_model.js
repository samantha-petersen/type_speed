const db = require('../db/db')

const Paragraphs = {
  limit(num) {
    const sql = `
    SELECT * FROM paragraphs ORDER BY RANDOM() LIMIT $1
    `
    return db.query(sql, [num])
      .then(res => {
        return res.rows
      })
  }
}

module.exports = Paragraphs