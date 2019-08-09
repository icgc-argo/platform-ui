
INSERT INTO egouser
    (id, name, email, type, firstname, lastname, createdat, lastlogin, status, preferredlanguage)
VALUES
    ('57b8f58e-cf8d-4a7f-ac49-51129e156f33',
    '',
    ',
    'ADMIN',
    'Foo',
    'Bar',
    NOW(),
    NOW(),
    'APPROVED',
    'ENGLISH');

INSERT INTO policy
    (id, owner, name)
VALUES
    ('27b08a5b-5328-4223-8ddc-c9e6dcaa48c3', NULL, 'PROGRAMSERVICE');

INSERT INTO userpermission
    (id, policy_id, user_id, access_level)
VALUES
    ('b69740f2-c9c9-413e-a682-d62b002b54a7',
    '27b08a5b-5328-4223-8ddc-c9e6dcaa48c3',
    '57b8f58e-cf8d-4a7f-ac49-51129e156f33',
    'WRITE');

INSERT INTO egoapplication 
    (id, name, clientid, clientsecret, redirecturi, description, status, type) 
VALUES 
    ('96eeb453-e08f-46f1-bfa8-6ee377ee5b1f',
    'ego admin',
    'ego',
    'egoadminsecret',
    'http://localhost:3501',
    'admin ui',
    'APPROVED',
    'ADMIN'),
    ('58037d95-63ab-46e4-9c35-f81889cd131c',
    'program service',
    'program',
    'programsecret',
    'http://program:8080',
    'program service',
    'APPROVED',
    'ADMIN'),
    ('c8b4e07c-9fb5-43cc-a43d-d14a6b03ef11',
    'platform',
    'platform',
    'platformsecret',
    'http://localhost:3000',
    'argo platform',
    'APPROVED',
    'CLIENT'),
    ('bea3aceb-91a5-4c97-9d53-14beb3af988d',
    'score server',
    'score',
    'scoresecret',
    'http://localhost:8087',
    'score server',
    'APPROVED',
    'CLIENT'),
    ('98d98180-65f9-11e9-a923-1681be663d3e',
    'song',
    'song',
    'song',
    'http://song:7080',
    'song',
    'APPROVED',
    'CLIENT');

