const fs = require('fs')

module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    fs.readFile('./public/users.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            const users = JSON.parse(data);
            if (limit) {
                res.json(users.slice(0, limit))
            }
            else {
                res.send(users)
            }
        }
    })
};

module.exports.getRandomUsers = (req, res, next) => {
    fs.readFile('./public/users.json', (err, data) => {
        if (err) {
            res.status(500).send('An Internal error occurred');
        } else {
            const users = JSON.parse(data);
            const randomUser = users[Math.floor(Math.random() * users.length)];

            res.json(randomUser);
        }
    });
};
module.exports.saveUser = (req, res, next) => {
    const newUser = req.body;
    // console.log(newUser.id, newUser.name, newUser.contact, newUser.gender, newUser.address, newUser.photoUrl);
    if (!newUser.id || !newUser.name || !newUser.gender || !newUser.contact || !newUser.address || !newUser.photoUrl) {
        res.status(400).send('all info are required');
    } else
        fs.readFile('./public/users.json', (err, data) => {
            if (err) {
                res.status(500).send('Error reading users file');
            } else {
                const users = JSON.parse(data);
                users.push(newUser);

                fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        res.status(500).send('Error writing to users file');
                    } else {
                        res.status(201).send('User added successfully');
                    }
                });
            }
        });
}

module.exports.updateUsers = (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    const updatedUser = req.body;

    fs.readFile('./public/users.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users file');
        } else {
            const users = JSON.parse(data);
            const userIndex = users.findIndex(user => user.id === userId);

            if (userIndex === -1) {
                res.status(404).send(`User with ID ${userId} not found`);
            } else {
                const currentUser = users[userIndex];
                const updatedFields = Object.keys(updatedUser);
                updatedFields.forEach(field => {
                    if (field !== 'id' && updatedUser[field]) {
                        currentUser[field] = updatedUser[field];
                    }
                });
                users[userIndex] = currentUser;
                fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        res.status(500).send('Error writing to users file');
                    } else {
                        res.status(200).send('User updated successfully');
                    }
                });
            }
        }
    });
};

module.exports.updateMultipleUsers = (req, res, next) => {
    const { updates } = req.body;
    fs.readFile('./public/users.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users file');
        } else {
            const users = JSON.parse(data);
            updates.forEach(update => {
                const { id, contact } = update;
                const userIndex = users.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    const currentUser = users[userIndex];
                    currentUser.contact = contact;
                    console.log(currentUser.contact);
                    users[userIndex] = currentUser;
                }
            });
            fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
                if (err) {
                    res.status(500).send('Error writing to users file');
                } else {
                    res.status(200).send('Users updated successfully');
                }
            });
        }
    });
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    fs.readFile('./public/users.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users file');
        } else {
            let users = JSON.parse(data);
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        res.status(500).send('Error writing to users file');
                    } else {
                        res.status(200).send('User deleted successfully');
                    }
                });
            } else {
                res.status(404).send('User not found');
            }
        }
    });
}