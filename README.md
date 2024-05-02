# nestjs-pino-trpc-req-log-issue

See issue: https://github.com/iamolegga/nestjs-pino/issues/1926

**Steps to reproduce:**
1. Clone the repo.
2. Checkout the branch: `feature/express-trpc-req-log-issue`
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