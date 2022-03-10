TCP: Transmission Control Protocol
IP: Internet Protocol
Together are communication Protocols, exactly how data travels around the internet
> HTTP: HyperText Transfer protocol: Just a protocol
That allows clients and web servers to communicate by sending requests and responses for clients to servers and back.

> Request Message:
Get
Headers: > Host, URL, Accept-Language, Authorization
Body:
    GET: Get data, Post: Post Data
    PUT: Set new data or modify all existing data.
    PATCH: Modify specific data in the existing data.

HTTPS: Encrypted and Secured HTTP

Response:
    - Status Code, HTTP Version
    - Response Body

### Communication Protocols TCP/IP
How data travels across the web
- Break the request and response in thousands of small chunks call packages before they are set
Then one they get to their destination, It will reassemble all the packets into the original request or response, so the message arrives as quick as possible, which would not be possible if we send the website as on big chunk.
Each package has the ip addresses of the destination

###  Web Server (NodeJS)
Computer Just Connected to the internet
HTTP Server communicate with the browser
Statics files lives in the server
#### Dynamic Server
Is and app, HTTP server, Files all talking with each others.
#### Databases
MongoDB NoSQL

> We can have different stack ()

### Statics vs Dynamic websites
Statics server serving statics sites.
Dynamics server because they are usually built on the server each time that you request something.

Dynamic sites usually contain DB

### Client Side Rendered (Call Data - across an API and build the website in the front)

### Node Infrastructures
> v8 also uses c++
> libuv (EventLoop, Thread Pool)
> NODE (C++, JS), and give us access to their functions in pure JavaScript
    > http-parser
    > c-ares
    > OpenSSL
    > ZLIB
#### LIBUV
Is complete written in c++


### Node Process(Instance of a program in execution on a computer)
#### Single Thread (Sequence of instructions)
Not Blocking that thread

#### Event Loop is the hard part of your application.
Some tasks are really heavy And so that is where the thread pool comes in which just like the event loop.
Libuv: That are completely separate from the main single thread. And we can actually configure  it up to 128 threads.
This threads together build the threads pool
Offloading this happens automatically behind the scene.

#### Event loop
All the application code that is inside  callback functions(non-top-top-level) run in the event loop

### NODE JS IS BUILD ALL AROUND CALLBACK FUNCTIONS
Function that call as soon as some work is finished some time in the future.
> This is because node use Event driven Architecture.
> Events are emitted
> Events loops picks them up
> Callbacks are called

The event loop does the orchestration, which simply means that it receives events calls their callback functions, and Offloads the more expensive tasks to the thread pool

When we start the node application, the event loop starts running right away.
The event loop has multiple phases
## DON'T BLOCK THE EVENT LOOP
> Don not use sync version of functions in fs, crypto, zlib modules in your callback functions

> Don't perform complex calculations *(eg loops insede loops)
> Be careful with json in large objects
> Don't use too complex regular expressions (nested quantifiers)