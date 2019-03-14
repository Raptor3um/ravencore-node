Ravencore Node
============

A Raptoreum full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Raptoreum with additional indexing](https://github.com/Raptor3um/raptoreum/tree/0.15.0-rtmcore) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Install

```bash
npm install -g rtmcore-node
rtmcore-node start
```

Note: For your convenience, we distribute raptoreumd binaries for x86_64 Linux and x86_64 Mac OS X. Upon npm install, the binaries for your platform will be downloaded. For more detailed installation instructions, or if you want to compile the project yourself, then please see the Ravencore branch of [Raptoreum with additional indexing](https://github.com/Raptor3um/raptoreum/tree/0.15.0-rtmcore).

## Prerequisites

- GNU/Linux x86_32/x86_64, or OSX 64bit *(for raptoreumd distributed binaries)*
- Node.js v0.10, v0.12 or v4
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~200GB of disk storage
- ~8GB of RAM

## Configuration

Ravencore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Ravencore Node.

```bash
rtmcore-node create -d <raptoreum-data-dir> mynode
cd mynode
rtmcore-node install <service>
rtmcore-node install https://github.com/yourname/helloworld
```

This will create a directory with configuration files for your node and install the necessary dependencies. For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Ravencore:

- [Insight API](https://github.com/Raptor3um/insight-api)
- [Insight UI](https://github.com/Raptor3um/insight-ui)
- [Ravencore Wallet Service](https://github.com/Raptor3um/rtmcore-wallet-service)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Ravend](docs/services/raptoreumd.md) - Interface to Raptoreum Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/Raptor3um/rtmcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/Raptor3um/rtmcore-node/blob/master/LICENSE).
