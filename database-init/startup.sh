#!/bin/bash
set -e


      sleep 20s

      #run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S sql -U $SQL_SA_USERNAME -P $SA_PASSWORD -d master -i setup.sql


exec "$@"