FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=SQL_password123
ENV SQL_SA_USERNAME=${SQL_SA_USERNAME}
ENV MSSQL_PID=Express

USER root

RUN mkdir /var/opt/sqlserver

RUN chown mssql /var/opt/sqlserver
ENV MSSQL_BACKUP_DIR="/var/opt/sqlserver"
ENV MSSQL_DATA_DIR="/var/opt/sqlserver"
ENV MSSQL_LOG_DIR="/var/opt/sqlserver"

COPY setup.sql /
COPY startup.sh /

ENTRYPOINT ./startup.sh