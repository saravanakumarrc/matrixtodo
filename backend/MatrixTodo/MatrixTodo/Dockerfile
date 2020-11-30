FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-nanoserver-1809 AS build
WORKDIR /src
COPY ["MatrixTodo.csproj", "MatrixTodo/"]
RUN dotnet restore "MatrixTodo/MatrixTodo.csproj"
COPY . .
WORKDIR "/src/MatrixTodo"
RUN dotnet build "MatrixTodo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MatrixTodo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MatrixTodo.dll"]