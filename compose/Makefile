start:
	. ./.env
	docker-compose up -d

add-admin:
	/bin/bash ./scripts/add_admin.sh $(EMAIL)

debug:
	. ./.env
	docker-compose up

stop:
	docker-compose down

nuke:
	docker-compose down -v

graph:
	docker run --rm -it --name dcv -v $$(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yaml -f