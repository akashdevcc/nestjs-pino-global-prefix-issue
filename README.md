# nestjs-pino-trpc-req-log-issue

The [issue](#the-issue) has been resolved. I worked on three [approaches](#approaches), out of which the [3rd approach](#approach-3) is the most appropriate one and utilizes NestJS core principles so that other NestJS functionalities and existing modules (i.e. nestjs-pino) can work with tRPC without any modifications.

## Approaches:

### Approach 3:
This approach has been merged to [main](https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/tree/main) branch.

In this approach, instead of using the official tRPC adaptors for express and fastify, we used NestJS Controllers in "[Library-specific approach](https://docs.nestjs.com/controllers#library-specific-approach)" and called the same "tRPC request handlers" which the official tRPC adaptors call underneath. With this approach, other NestJS functionalities (i.e. Guards, Pipes etc.) and existing modules (i.e. nestjs-pino) can still be used with tRPC, which was not possible with other two approaches.

#### Things left to do/explore:
1. tRPC Playground (Able to run the queries/mutations but the docs and auto-complete does not seem to work!)
2. tRPC Protected Procedures using NestJS Guards
3. tRPC Subscriptions

### Approach 2 (Not recommended):
For express: https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/tree/express-approach-2

For fastify: https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/tree/fastify-approach-2

This approach required to modify `nestjs-pino` (as done [here](https://github.com/iamolegga/nestjs-pino/compare/master...akashdevcc:nestjs-pino:master)) to export its internal `createLoggerMiddlewares` function, so that it can be used externally before any middleware in the request lifecycle, as done [here](https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/blob/express-approach-2/src/main.ts#L19).

More discussion about this approach [here](https://github.com/iamolegga/nestjs-pino/issues/1926#issuecomment-2084910244).

### Approach 1 (Not recommended):
For express: https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/tree/express-approach-1

**This approach only works for express.** As "NestJS Middlewares" are just express middlewares underneath, the "trpc express middleware" is reimplemented as "NestJS Middleware" [here](https://github.com/akashdevcc/nestjs-pino-trpc-req-log-issue/blob/express-approach-1/src/trpc.middleware.ts). `TrpcModule` is defined and imported in `AppModule` after `LoggerModule` so that LoggerMiddleware gets executed before TrpcMiddleware in request lifecycle.

## The Issue
See issue: https://github.com/iamolegga/nestjs-pino/issues/1926

**Steps to reproduce:**
1. Clone the repo.
2. Checkout the branch: `the-issue`
3. Do `pnpm i` and `pnpm start`
4. In another terminal, trigger command: `curl -X GET "http://localhost:3000/api/trpc/greet"`
5. Logs are written as follows:
    ```sh
    [02:58:02.136] INFO (196835): in AppRouterFactory::greet() trpc path {"context":"AppRouterFactory"}
    [02:58:02.137] INFO (196835): in AppService::greet() method {"context":"AppService"}
    ```
6. Again, trigger command: `curl -X GET "http://localhost:3000/greet"`
7. Logs are written as follows:
    ```sh
    [02:58:39.152] INFO (196835): in AppController::greet() method {"req":{"id":1,"method":"GET","url":"/greet","query":{},"params":{"0":"greet"},"headers":{"host":"localhost:3000","user-agent":"curl/7.81.0","accept":"*/*"},"remoteAddress":"::ffff:127.0.0.1","remotePort":34612},"context":"AppController"}
    [02:58:39.152] INFO (196835): in AppService::greet() method {"req":{"id":1,"method":"GET","url":"/greet","query":{},"params":{"0":"greet"},"headers":{"host":"localhost:3000","user-agent":"curl/7.81.0","accept":"*/*"},"remoteAddress":"::ffff:127.0.0.1","remotePort":34612},"context":"AppService"}
    [02:58:39.154] INFO (196835): request completed {"req":{"id":1,"method":"GET","url":"/greet","query":{},"params":{"0":"greet"},"headers":{"host":"localhost:3000","user-agent":"curl/7.81.0","accept":"*/*"},"remoteAddress":"::ffff:127.0.0.1","remotePort":34612},"res":{"statusCode":200,"headers":{"x-powered-by":"Express","content-type":"text/html; charset=utf-8","content-length":"12","etag":"W/\"c-Lve95gjOVATpfV8EL5X4nxwjKHE\""}},"responseTime":3}
    ```
Expectation is to see the same logs in "Step 5" too as showing in "Step 7", when trpc query is triggered.