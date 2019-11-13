#!/bin/bash
export PGPASSWORD=password
echo $1
docker exec $(docker ps | grep ego-db | awk '{print $NF}') psql -U postgres -d ego -h localhost -c "DELETE FROM egouser WHERE egouser.name='$1'"
docker exec $(docker ps | grep ego-db | awk '{print $NF}') psql -U postgres -d ego -h localhost -c "INSERT INTO egouser (id, name, email, type, firstname, lastname, createdat, lastlogin, status, preferredlanguage) VALUES ('57b8f58e-cf8d-4a7f-ac49-51129e156f33', '$1', '$1', 'ADMIN', 'Foo', 'Bar', NOW(), NOW(), 'APPROVED', 'ENGLISH');"
docker exec $(docker ps | grep ego-db | awk '{print $NF}') psql -U postgres -d ego -h localhost -c "INSERT INTO userpermission (id, policy_id, user_id, access_level) VALUES ('b69740f2-c9c9-413e-a682-d62b002b54a7', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c3', '57b8f58e-cf8d-4a7f-ac49-51129e156f33', 'WRITE');"

docker exec $(docker ps | grep ego-db | awk '{print $NF}') psql -U postgres -d ego -h localhost -c "INSERT INTO userpermission (id, policy_id, user_id, access_level) VALUES ('b69740f2-c9c9-413e-a682-d62b002b54a8', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c4', '57b8f58e-cf8d-4a7f-ac49-51129e156f33', 'WRITE');"
docker exec $(docker ps | grep ego-db | awk '{print $NF}') psql -U postgres -d ego -h localhost -c "INSERT INTO userpermission (id, policy_id, user_id, access_level) VALUES ('b69740f2-c9c9-413e-a682-d62b002b54a9', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c5', '57b8f58e-cf8d-4a7f-ac49-51129e156f33', 'WRITE');"
