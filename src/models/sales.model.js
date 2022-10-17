const connection = require('./db/connection');

const sales = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [productId],
  );
  return result;
};

module.exports = {
  sales,
};