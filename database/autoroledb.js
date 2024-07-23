const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/autorole.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS autorole (guildId TEXT PRIMARY KEY, roleId TEXT, status INTEGER)");
});

module.exports = {
  saveAutoRole(guildId, roleId, status) {
    db.run("INSERT OR REPLACE INTO autorole (guildId, roleId, status) VALUES (?, ?, ?)", [guildId, roleId, status]);
  },
  getAutoRole(guildId, callback) {
    db.get("SELECT * FROM autorole WHERE guildId = ?", [guildId], (err, row) => {
      callback(row);
    });
  }
};
