exports.getUsers = (req, res) => {
    res.send('Get all users');
  };
  
  exports.createUser = (req, res) => {
    const user = req.body;
    res.send(`User ${user.name} created!`);
  };
  