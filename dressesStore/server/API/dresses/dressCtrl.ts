import connection from "../../DB/database";
import Dress from "./../../../client/src/types/dress";

export async function getAllDresses(req, res) {
  try {
    const query = `SELECT * FROM dresses`;
    connection.query(query, (err, results, fields) => {
      if (err) throw err;

      res.send({ ok: true, dressesArr: results });
    });
  } catch (error) {
    res.status(500).send({ ok: false, error: error.message });
  }
}

export async function searchDress(req, res) {
  try {
    const nameDress = req.params.name;
    const query = `SELECT * FROM dresses WHERE dress_name LIKE ('%${nameDress}%')`;
    connection.query(query, (error, results, fields) => {
      try {
        if (error) throw error;
        if (results.length == 0) {
          res.send({ ok: false, error: "Dress does not exsit" });
        } else {
          res.send({ ok: true, dressesArr: results });
        }
      } catch (error) {
  
        res.status(500).send({ ok: false, error: error.message });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ ok: false, error: error.message });
  }
}

export async function addDresses(req, res) {
  try {
    const { srcDress, nameDress, priceDress } = req.body;
    const query = `SELECT * FROM dresses WHERE dress_name='${nameDress}';`;
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        if (results.length > 0) {
          throw new Error("Dress is exsits ");
        } else {
          const query = `INSERT INTO dresses ( dress_name, dress_price, img )
          VALUES('${nameDress}', '${priceDress}', '${srcDress}' )`;
          connection.query(query, (err, results, fields) => {
            try {
              if (err) throw err;
              const dress_id = results.insertId;
              res.send({
                ok: true,
                results: dress_id,
              });
            } catch (error) {
              console.log(error);
              res.status(500).send({ ok: false, error: error.message });
            }
          });
        }
      } catch (error) {
        res.status(500).send({ error: error.message, status: false });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function setSizeQuantity(req, res) {
  try {
    const dress_id = req.params.dress_id;
    const query2 = `SELECT size_id FROM sizes `;
    connection.query(query2, (err, results3, fields) => {
      try {
        if (err) throw err;
        const dressSizes: number[] = results3.size_id;
        for (let i = 0; i < results3.length; i++) {
          const query3 = `INSERT INTO inventory (dress_id, size_id  , quantity)
                        VALUES('${dress_id}', '${results3[i].size_id}', 0)`;
          connection.query(query3, (err, results2, fields) => {
            if (err) throw err;
          });
        }
        const query4 = `SELECT  *  FROM inventory 
      INNER JOIN sizes 
      ON sizes.size_id=inventory.size_id
      WHERE dress_id='${dress_id}';`;
        connection.query(query4, (err, results4, fields) => {
          try {
            if (err) throw err;
            res.send({
              ok: true,
              results: dress_id,
              results4: results4,
              message: "Dress And Sizes Added successFully",
            });
          } catch (error) {
            res.status(500).send({ error: error.message, status: false });
          }
        });
      } catch (error) {
        res.status(500).send({ error: error.message, status: false });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function updateInventory(req, res) {
  try {
    const { quantity, size_id } = req.body;
    const { dress_id } = req.params;
    const query = `UPDATE inventory SET quantity ='${quantity}' 
    WHERE dress_id='${dress_id}' AND size_id='${size_id}'`;
    connection.query(query, (error, results, fields) => {
      if (error) throw error;

      res.send({ ok: "ok", results: quantity });
    });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export function getInventoryToUpdate(req, res) {
  try {
    const { dress_id } = req.params;
    const query = `SELECT  *  FROM inventory 
      INNER JOIN sizes 
      ON sizes.size_id=inventory.size_id
      WHERE dress_id='${dress_id}';`;
    connection.query(query, (err, results4, fields) => {
      try {
        if (err) throw err;
        res.send({
          ok: true,
          results: dress_id,
          results4: results4,
          message: "200",
        });
      } catch (error) {
        res.status(500).send({ error: error.message, status: false });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getDressSizes(req, res) {
  try {
    const { dress_id } = req.params;
    const query = `SELECT  *  FROM sizes 
    INNER JOIN inventory  
    ON sizes.size_id=inventory.size_id
    WHERE dress_id='${dress_id}';`;
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({
          ok: true,
          results: dress_id,
          sizeArr: results,
          message: "200",
        });
      } catch (error) {
        res.status(500).send({ error: err.message, status: false });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function deleteDress(req, res) {
  try {
    const { nameDress } = req.params;
    console.log(nameDress);
    const query1 = ` SELECT * FROM dresses WHERE dress_name='${nameDress}';`;
    connection.query(query1, (error, results1, fields) => {
      try {
        if (error) throw error;
        if (results1.length == 0) {
          res.send({ ok: false, error: "Dress does not exsit" });
        } else {

          const query = `DELETE FROM dresses WHERE dress_name='${nameDress}';`;
          connection.query(query, (error, results, fields) => {
            try {
              if (error) throw error;
              const query = `DELETE FROM inventory WHERE dress_id=${results1[0].dress_id}`;
              connection.query(query, (error, results2, fields) => {
                try {
                  if (error) throw error;
                  res.send({
                    ok: true,
                    results: nameDress,
                  });
                } catch (error) {
                  res.status(500).send({ error: error.message, status: false });
                }
              });
            } catch (error) {
              res.status(500).send({ error: error.message, status: false });
            }
          });
        }
      } catch {
        res.status(500).send({ error: error.message, status: false });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function insertToRenting(req, res) {
  try {
    const { nameDress } = req.params;
    const { sizes, user } = req.body;
    const query = `SELECT * FROM sizes WHERE size='${sizes}' `;
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        const query1 = `SELECT * FROM users WHERE user_id='${user.user_id}' `;
        connection.query(query1, (err, results1, fields) => {
          try {
            if (err) throw err;
            const query2 = `SELECT * FROM dresses WHERE dress_name='${nameDress}' `;
            connection.query(query2, (err, results2, fields) => {
              try {
                if (err) throw err;
                const query3 = `INSERT INTO renting_dresses (user_id, dress_id, size_id, renting_date)
                 VALUES ('${results1[0].user_id}', '${results2[0].dress_id}', '${results[0].size_id}', CURDATE() ) `;
                connection.query(query3, (err, results3, fields) => {
                  try {
                    if (err) throw err;
                    res.send({
                      ok: true,
                      results: results3,
                    });
                  } catch (error) {
                    res.status(500).send({ error: error.message });
                  }
                });
              } catch (error) {
                res.status(500).send({ error: error.message });
              }
            });
          } catch (error) {
            res.status(500).send({ error: error.message });
          }
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getMyDress(req, res) {
  try {
    const { userId } = req.params;
    const query = `SELECT dresses.img, dresses.dress_id, dresses.dress_price , dresses.dress_name,
    sizes.size
    FROM renting_dresses JOIN dresses 
    ON renting_dresses.dress_id= dresses.dress_id
    INNER JOIN sizes
    ON renting_dresses.size_id= sizes.size_id
     WHERE user_id='${userId}' `;
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({
          ok: true,
          results: results,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
