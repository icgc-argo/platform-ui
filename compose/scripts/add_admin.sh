#!/bin/bash
export PGPASSWORD=password
echo $1
psql -U postgres -d ego -h localhost -p 18888 -c "DELETE FROM egouser WHERE egouser.name='$1'"
psql -U postgres -d ego -h localhost -p 18888 -c "INSERT INTO egouser (id, name, email, type, firstname, lastname, createdat, lastlogin, status, preferredlanguage) VALUES ('57b8f58e-cf8d-4a7f-ac49-51129e156f33', '$1', '$1', 'ADMIN', 'Foo', 'Bar', NOW(), NOW(), 'APPROVED', 'ENGLISH');"
psql -U postgres -d ego -h localhost -p 18888 -c "INSERT INTO userpermission (id, policy_id, user_id, access_level) VALUES ('b69740f2-c9c9-413e-a682-d62b002b54a7', '27b08a5b-5328-4223-8ddc-c9e6dcaa48c3', '57b8f58e-cf8d-4a7f-ac49-51129e156f33', 'WRITE');"