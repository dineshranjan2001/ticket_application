const app = require("../app");
const { sequelize } = require("./database.test");

beforeAll(async () => {
  sequelize.sync({ force: true });
});

afterAll(async () => {
    sequelize.close();
});
