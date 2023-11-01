import { APIGatewayEvent, Context } from "aws-lambda";

const token = process.env.CLIENT_PK;


// Mockear tus objetos event y context

export const mockEvent: APIGatewayEvent = {
    body: JSON.stringify({ /* Datos del cuerpo del evento */ }),
    httpMethod: "",
    isBase64Encoded: false,
    path: "",
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
    multiValueHeaders: {},
    resource: "",
    requestContext: {
        accountId: "",
        apiId: "",
        authorizer: {
            /* Datos del autorizador */
        },
        connectedAt: 0,
        connectionId: "",
        domainName: "",
        domainPrefix: "",
        eventType: "",
        extendedRequestId: "",
        httpMethod: "",
        identity: {
            accessKey: null,
            accountId: null,
            apiKey: null,
            apiKeyId: null,
            caller: null,
            clientCert: null,
            cognitoAuthenticationProvider: null,
            cognitoAuthenticationType: null,
            cognitoIdentityId: null,
            cognitoIdentityPoolId: null,
            principalOrgId: null,
            sourceIp: "",
            user: null,
            userAgent: null,
            userArn: null,
        },
        messageDirection: "",
        messageId: "",
        path: "",
        stage: "",
        requestId: "",
        requestTime: "",
        requestTimeEpoch: 0,
        resourceId: "",
        resourcePath: "",
        routeKey: "",
        protocol: ""
    },
};

export const mockContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "",
    functionVersion: "",
    invokedFunctionArn: "",
    memoryLimitInMB: "",
    awsRequestId: "",
    logGroupName: "",
    logStreamName: "",
    getRemainingTimeInMillis: function (): number {
        throw new Error("Function not implemented.");
    },
    done: function (error?: Error | undefined, result?: any): void {
        throw new Error("Function not implemented.");
    },
    fail: function (error: string | Error): void {
        throw new Error("Function not implemented.");
    },
    succeed: function (messageOrObject: any): void {
        throw new Error("Function not implemented.");
    }
};
