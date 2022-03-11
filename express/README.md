Express is a minimal node.js framework a higher level of abstraction.
Is the most popular js framework.

> Express contains a very robust set o features, complex routing, easier handling of request and responses,
middlewares, server-side rendering, etc.

> Express  allow for rapid development of nodejs applicationsapplication we don't hce to reinvent the wheel.

> MVC Architecture. Make easier to organize


### API Application Programing Interface
a pice of software that can be used by another pice of software in order to allow applications to talk to each other.

> PUT: The client supposed the send the entire updated object.
> PATH: Partial update object
> POST: Create new resource

```
yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D
```

### Application Logic [El como] [CONTROLLERS]
> Management the application request and response processing
Code that is only concerned about the application's implementation, not the underlying business problem we are trying to solve (e.g Showing seling tours)

The login that makes de app actually work
> Concerned about managing request and responses
> About the app's more technical aspects
> Bridge between model and view layers


### business Logics [El que] [MODELS]
> Code that actually solves the business problem we set out to solve
>Show tours y sell them,
> Directly related to bussines rules, how the business works and business needs.
> Examples:
    Creating new torus in the database
    - Cheking if users password is correct
    - Validation user input data
    - Ensuring only users who  a tour can review it

>> Fat models/ thin controllers: Offload as much logic as possible into the models, and keep the controllers as simple and lean as possible