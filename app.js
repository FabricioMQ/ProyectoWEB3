try {
    const Server=require('./Models/Server');
    const ServerUp= new Server();
    ServerUp.listen();
} catch (err) {
    console.log(err,'que raro ah no inicio el servidor')    
}
