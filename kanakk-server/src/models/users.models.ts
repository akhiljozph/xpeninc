import { DataTypes } from "sequelize";

import sequelize from "../database/index";

const Users = sequelize.define('users', {
    name: DataTypes.STRING,
});

Users.sync();

export default Users;