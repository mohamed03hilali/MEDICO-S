const executeQuery  = require('../../utils/sql'); // ✅ destructuration
const { TYPES } = require('../../config/db');

async function getAllRoleUsers() {
  const query = `
    SELECT ID_USER, ID_ROLE
    FROM Role_User
  `;
  return await executeQuery(query);
}

async function getRolesByUserId(idUser) {
  const query = `
    SELECT RU.ID_ROLE, R.LIBELLE_ROLE
    FROM Role_User RU
    JOIN Role R ON RU.ID_ROLE = R.ID_ROLE
    WHERE RU.ID_USER = @idUser
  `;
  const params = [{ name: 'idUser', type: TYPES.Int, value: idUser }];
  return await executeQuery(query, params);
}

async function addRoleToUser(data) {
  const query = `
    INSERT INTO Role_User (ID_USER, ID_ROLE)
    VALUES (@idUser, @idRole)
  `;
  const params = [
    { name: 'idUser', type: TYPES.Int, value: data.ID_USER },
    { name: 'idRole', type: TYPES.Int, value: data.ID_ROLE }
  ];
  return await executeQuery(query, params);
}

async function removeRoleFromUser(idUser, idRole) {
  const query = `
    DELETE FROM Role_User
    WHERE ID_USER = @idUser AND ID_ROLE = @idRole
  `;
  const params = [
    { name: 'idUser', type: TYPES.Int, value: idUser },
    { name: 'idRole', type: TYPES.Int, value: idRole }
  ];
  return await executeQuery(query, params);
}

module.exports = {
  getAllRoleUsers,
  getRolesByUserId,
  addRoleToUser,
  removeRoleFromUser
};
