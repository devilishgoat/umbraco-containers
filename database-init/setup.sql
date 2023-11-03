USE [master]
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'UmbracoDb')
BEGIN

    CREATE DATABASE [UmbracoDb] ON 
    ( FILENAME = N'/sqldata/UmbracoDB.mdf' ),
    ( FILENAME = N'/sqldata/UmbracoDB_log.ldf' )
    FOR ATTACH

END;
GO

USE UmbracoDb;