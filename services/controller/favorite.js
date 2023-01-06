const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/favorite.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const FavoriteService = grpc.loadPackageDefinition(packageDefinition).FavoriteService;
const client = new FavoriteService('127.0.0.1:3003', grpc.credentials.createInsecure());

module.exports = client;
