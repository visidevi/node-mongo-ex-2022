<!-- NODE STREAMS FUNDAMENTALS -->
Streams are instances of the EventEmitter class

>Readable streams
>Writeable Streams

### Readable Streams
Streams from which we can read data, write:
Eg: http Request
fs read streams
>> Important Events
Data, End
>> Important Functions:
pipe(), read()
### Writeable streams
Streams to which we can write data.
Http Response, fs write stream
>> Important Events
drain, finish
>> Important Functions
wirte(), end()
### Duplex Stream
Streams that are both readable and writable
Eg: net web sockets