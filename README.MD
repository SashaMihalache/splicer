***Splicer***: A beat sequencer

** start docker container **

sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<YourStrong!Passw0rd>' \
   -p 1433:1433 --name sql1 \
   -d microsoft/mssql-server-linux:2017-latest


** view docker containers **

docker ps -a 


** change sa password **

sudo docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U SA -P '<YourStrong!Passw0rd>' \
   -Q 'ALTER LOGIN SA WITH PASSWORD="<YourNewStrong!Passw0rd>"'


** connect to sql server **

docker exec -it sql1 'bash'


** connect inside the container with sqlcmd **

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'P@ssw0rd'


** working with sql from terminal **

CREATE DATABASE TEstDB
USE TestDB

SELECT Name from sys.Databases
SELECT Name from sys.Tables

CREATE TABLE test ( id INT, name NVARCHAR(50), quantity INT )
CREATE TABLE audio ( id INT IDENTITY(1,1) PRIMARY KEY, name NVARCHAR(50), blobdata VARBINARY(MAX))
INSERT INTO test values (1, 'sasha', 10)
GO


** exit from sql terminal **
quit
exit


** remove container **
docker stop sql1
docker rm sql1



** copy files from your machine to docker container **

cd /backend/db_scripts
tar -c * | docker exec -i sql1 /bin/tar -C /tmp -x

** how to run the script from the docker container with bash **

move in /tmp folder where the files where copied and run
../opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'P@ssw0rd' -i ./UpdateDb.sql
