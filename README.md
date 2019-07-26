# whats-for-dinner

## Project setup
```
npm install
```

### Compiles and hot-reloads for development - app only
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Local Integrated Development

I recommend running a [local instance of Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).
The docker container is fast to set up and then it's as simple as running

```
docker run -p 8000:8000 amazon/dynamodb-local
```

In order to run the lambda functions that query the local instance of DynamoDB, you will need to install the [Netlify CLI](https://www.netlify.com/docs/cli/).
The current version of the netlify dev command does not run the prebuild script so it must be called out manually:

```
npm run build; netlify dev
```