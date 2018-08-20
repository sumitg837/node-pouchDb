const app = require('../app');
/**controllers **/
const user_controller = require('../app/controllers').user_controller;
app.get('/test', (req, res)=>{ res.send('ok') })

app.get('/', user_controller.index);
app.get('/api/user', user_controller.show);
app.post('/api/user', user_controller.store);
app.get('/api/user/:id', user_controller.edit);
app.post('/api/user/:id', user_controller.update);
app.post('/api/:id/user', user_controller.destroy);
