// Sourced format from
// https://tech.chaotictoejam.com/index.php/2020/04/22/how-to-read-and-write-to-dynamodb-using-aws-lambda/

// Loads in the AWS SDK
const AWS = require('aws-sdk');
// Loads in crypto for UUID generation
var crypto = require('crypto');

// Creates the document client specifing the region 
// as 'ap-southeast-2' (Sydney)
const ddb = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-2'}); 

exports.handler = async (event, context, callback) => {
    // Captures the requestId from the context message
    const requestId = context.awsRequestId;

    // Handle promise fulfilled/rejected states
    await createMessage(requestId, event).then(() => {
        // If success return 201
        callback(null, {
            statusCode: 201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err)
    })
};

// Function createMessage
// Writes message to DynamoDb table Message
// Returns promise
function createMessage(requestId, event) {
    // Date object, will allow us to sort and filter chronologically
    const d = new Date()
    let currentDate = d.toString();
    // String object, 4 options, positive, negative, false, unknown
    let testResult = 'positive';
    // S3 interface used, will have to figure out whether to use url or etag
    
    // Create a hash for testId
    let md5sum = crypto.randomUUID();
    
    const params = {
        TableName: 'Acc-EmployeeResults',
        Item: {
            'testId'   : md5sum,
            'MemberId' : event.MemberId,
            'Timestamp': currentDate,
            'Result'   : event.Result,
            'ImageLink': event.ImageLink
        }
    }
    return ddb.put(params).promise();
}