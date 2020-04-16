#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["MatrixTodo/MatrixTodo.csproj", "MatrixTodo/"]
RUN dotnet restore "MatrixTodo/MatrixTodo.csproj"
COPY . .
WORKDIR "/src/MatrixTodo"
RUN dotnet build "MatrixTodo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MatrixTodo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000/tcp
ENTRYPOINT ["dotnet", "MatrixTodo.dll"]