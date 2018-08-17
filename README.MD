# Splicer: A beat sequencer

<br/>

### pull docker container with sql server
`docker pull microsoft/mssql-server-linux:2017-latest`

<br/>

### start docker container

`sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=internship_user'` <br/>
`   -p 1535:1535 --name internship_db ` <br/>
`   -d microsoft/mssql-server-linux:2017-latest` <br/>

<br/>

### view docker containers

`docker ps -a`

<br/>

### change sa user's password

`sudo docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd` <br/>
`   -S localhost -U SA -P 'intership_user'` <br/>
`   -Q 'ALTER LOGIN SA WITH PASSWORD="internship_user_NEW_PASSWORD"'` <br/>

### connect to sql server

`docker exec -it sql1 'bash'`

<br/>

### connect inside the container with sqlcmd

`/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'internship_user'`

<br/>

### working with sql from terminal (type GO after each statement)

`CREATE DATABASE InternshipProject` <br/>
`USE InternshipProject`

<br/>

`SELECT Name from sys.Databases` <br/>
`SELECT Name from sys.Tables`

<br/>

`CREATE TABLE test ( id INT, name NVARCHAR(50), quantity INT )` <br/>
`CREATE TABLE audio ( id INT IDENTITY(1,1) PRIMARY KEY, name NVARCHAR(50), blobdata VARBINARY(MAX))` <br/>
`INSERT INTO test values (1, 'sasha', 10)` <br/>
GO`

<br/>

### exit from sql terminal
`quit
exit`

<br/>

### remove container
`docker stop sql1` <br/>
`docker rm sql1`

<br/>

### copy files from your machine to docker container

`cd /backend/db_scripts` <br/>
`tar -c * | docker exec -i sql1 /bin/tar -C /tmp -x`

<br/>

### how to run the script from the docker container with bash

move in /tmp folder where the files where copied and run 

<br/>

`../opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'P@ssw0rd' -i ./UpdateDb.sql`

<br/>

### make a shell script to run this automatically
1. apt-get update (to update linux package manager)
2. apt-get install vim
3. use vim to write in a seed.sh '../opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'P@ssw0rd' -i ./UpdateDb.sql' command
4. chmod +x seed.sh (to give permission to execute file)
5. from terminal run it ./script.sh
