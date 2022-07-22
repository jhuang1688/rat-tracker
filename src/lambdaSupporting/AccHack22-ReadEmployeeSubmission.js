var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();

exports.handler = (event, context, callback) => {
    dynamodb.scan({TableName: 'Acc-EmployeeResults'}, (err, data) => {
        callback(null, data['Items']);
    });
};

// exports.handler = async (event) => {
//     const response = {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Headers" : "Content-Type",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//         },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };