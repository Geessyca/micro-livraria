const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('../inventory/products.json');

const packageDefinition = protoLoader.loadSync('proto/favorite.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const favoriteProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const fs = require("fs");


const updateFavoritos = (newItem) => {
    const dataString = fs.readFileSync("D:/micro-livraria/services/favorite/arquivo.json", 'utf-8');
    const dataObj = JSON.parse(dataString);
    if (!dataObj.products_id.includes(newItem)){
    dataObj.products_id.push(newItem)}
    else { dataObj.products_id.pop(newItem) }
    const newDataString = JSON.stringify(dataObj, null,2);
    fs.writeFileSync("D:/micro-livraria/services/favorite/arquivo.json", newDataString, 'utf-8')
}

server.addService(favoriteProto.FavoriteService.service, {
    GetFavoriteRate: (payload, callback) => {
        updateFavoritos(payload.request.id)
        callback(
            null,
            products.find((product) => product.id == payload.request.id)
        );
    },
});

server.bindAsync('0.0.0.0:3003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Favorite Service running at http://127.0.0.1:3003');
    server.start();
});
