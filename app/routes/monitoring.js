const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");

// Each monitor is a function that returns an object with a status ("warning"
// or "ok", a message, and "details" which can be any JSON.
const monitors = {
  missingUsernames: async () => {
    const badEmployees = await Employee.find({
      certNumber: { $exists: true, $nin: [null, ""] },
      $or: [{ username: null }, { username: "" }]
    });

    if (badEmployees.length > 0) {
      return {
        status: "warning",
        message: `${badEmployees.length} employee(s) have cert numbers but not usernames.`,
        details: { employeeIds: badEmployees.map(e => e.id) }
      };
    } else {
      return {
        status: "ok",
        message: "All employees with cert numbers have usernames."
      };
    }
  },
  duplicateEmployeeNameIds: async () => {
    const dupes = await Employee.aggregate(
      { $group: { _id: "$nameId", count: { $sum: 1 } } },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
      { $project: { nameId: "$_id", _id: 0 } }
    );
    console.log(dupes);
    return { status: "ok", message: "foo" };
  }
};

router.route("/v1/monitoring/:monitor").get(async (req, res) => {
  const monitor = monitors[req.params.monitor];

  res.json(await monitor());
});

router.route("/v1/monitoring").get(async (req, res) => {
  const monitorNames = Object.keys(monitors);

  const pairs = await Promise.all(
    monitorNames.map(async name => [name, await monitors[name]()])
  );

  res.json(Object.fromEntries(pairs));
});

module.exports = router;
