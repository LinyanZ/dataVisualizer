const db = require("../start/db");

const getData = async (req, res) => {
  if (!req.query.saLevel || !req.query.category)
    return res.status(400).send("missing 'saLevel' or 'category' query");

  const data = db.collection(`category${req.query.category}`);

  const result = await data
    .aggregate([
      {
        $project: {
          sa2: "$sa2",
          sa3: {
            $substr: ["$sa2", 0, 5],
          },
          sa4: {
            $substr: ["$sa2", 0, 3],
          },
          value: "$value",
        },
      },
      {
        $group: {
          _id: `$sa${req.query.saLevel}`,
          avg: {
            $avg: "$value",
          },
          count: {
            $count: {},
          },
          max: {
            $max: "$value",
          },
          min: {
            $min: "$value",
          },
          sum: {
            $sum: "$value",
          },
        },
      },
    ])
    .toArray();
  res.send(result);
};

module.exports = getData;
