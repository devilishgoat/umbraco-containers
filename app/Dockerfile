# Copy csproj and restore as distinct layers
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /sources

# Copy everything else and build website
COPY /src/website/*.csproj .

COPY /src/website/appsettings.json .
COPY /src/website/Program.cs .
COPY /src/website/Startup.cs .

COPY /src/website/Properties ./Properties
COPY /src/website/Views ./Views

# Build umbraco
RUN dotnet restore
RUN dotnet build
RUN dotnet publish -c release -o /output --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /output
COPY --from=build /output ./


ENTRYPOINT ["dotnet", "website.dll"]