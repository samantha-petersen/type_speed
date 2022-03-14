const db = require('./db')
const fs = require('fs')

const file = fs.readFileSync('./paragraphs.txt', 'utf8')
const paragraphArray = file.split('\n')

function insertIntoDb(data) {
  data.forEach(para => {
    const sql = `INSERT INTO paragraphs(paragraph) VALUES($1)`
    db.query(sql, [para])
  })
}
insertIntoDb(paragraphArray)

// have to run this file in node to import data
// run ONLY ONCE