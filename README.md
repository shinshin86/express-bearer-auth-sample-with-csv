# express-bearer-auth-sample-with-csv

## Usage

```sh
# server start
yarn start
```

Once you have started the server, you can check its operation with the curl command.

```sh
curl http://localhost:3000 -H 'Authorization: Bearer foo'
# => {"reponse":{"user":{"id":"1","name":"AAAAAA","token":"foo"}}}

curl http://localhost:3000
# => {"message":"Unauthorized"}

curl http://localhost:3000 -H 'Authorization: Bearer fooo'
# => {"message":"Unauthorized"}
```

## Development

```sh
yarn dev

# code format
yarn fmt
```
