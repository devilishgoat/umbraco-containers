#!/bin/bash
set -e


      sleep 20s

      #run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S sql -U $1 -P $2 -d master -i setup.sql


exec "$@"