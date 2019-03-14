# Upgrade Notes

## From rtmcore 3.0.0 to 4.0.0

`rtmcore-node@2.1.1` to `rtmcore-node@3.0.0`

This major upgrade includes changes to indexes, API methods and services. Please review below details before upgrading.

### Indexes

Indexes include *more information* and are now also *faster*. Because of this a **reindex will be necessary** when upgrading as the address and database indexes are now a part of raptoreumd with three new `raptor.conf` options:
- `-addressindex`
- `-timestampindex`
- `-spentindex`

To start reindexing add `reindex=1` during the **first startup only**.

### Configuration Options

- The `raptor.conf` file in will need to be updated to include additional indexes *(see below)*.
- The `datadir` option is now a part of `raptoreumd` spawn configuration, and there is a new option to connect to multiple raptoreumd processes (Please see [Raptoreum Service Docs](services/raptoreumd.md) for more details). The services `db` and `address` are now a part of the `raptoreumd` service. Here is how to update `rtmcore-node.json` configuration options:

**Before**:
```json
{
  "datadir": "/home/<username>/.raptor",
  "network": "livenet",
  "port": 3001,
  "services": [
    "address",
    "raptoreumd",
    "db",
    "web"
  ]
}
```

**After**:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "raptoreumd",
    "web"
  ],
  "servicesConfig": {
    "raptoreumd": {
      "spawn": {
        "datadir": "/home/<username>/.raptor",
        "exec": "/home/<username>/rtmcore-node/bin/raptoreumd"
      }
    }
  }
}
```

It will also be necessary to update `raptor.conf` settings, to include these fields:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:<port>
zmqpubhashblock=tcp://127.0.0.1:<port>
rpcallowip=127.0.0.1
rpcuser=<user>
rpcpassword=<password>
```

**Important**: Once changes have been made you'll also need to add the `reindex=1` option **only for the first startup** to regenerate the indexes. Once this is complete you should be able to remove the `rtmcore-node.db` directory with the old indexes.

### API and Service Changes
- Many API methods that were a part of the `db` and `address` services are now a part of the `raptoreumd` service. Please see [Raptoreum Service Docs](services/raptoreumd.md) for more details.
- The `db` and `address` services are deprecated, most of the functionality still exists. Any services that were extending indexes with the `db` service, will need to manage chain state itself, or build the indexes within `raptoreumd`.
