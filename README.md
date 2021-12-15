### Maintainability
The Lambda function is written on Serverless Framework which generates Cloud Formation templates and configurations to aid in deployment in the application. This allows us as developers to maintain the code more easily as the deployment of the code is abstracted away from us and configured

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```


### Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

# project-2021-22t1-g1-team5-lambda
