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

server.addService(favoriteProto.FavoriteService.service, {
    GetFavoriteRate: (payload, callback) => {
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
