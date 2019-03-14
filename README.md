# Custom-Responses

## Instructions to use:

```npm install @naveen16/customresponses```

```
const customResponses = require('@naveen16/customresponses');

app.use(customResponses);
```

Once you have done the above in your app entry point, the express response object will contain the custom responses, and you can use them as follows:

```res.unprocessableEntity(err)
```
