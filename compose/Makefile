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

graphs:
	cat docker-compose.yaml | docker run -i funkwerk/compose_plantuml --link-graph | docker run -i think/plantuml -tpng > assets/relationship.png & 
	cat docker-compose.yaml | docker run -i funkwerk/compose_plantuml --boundaries | docker run -i think/plantuml -tpng > assets/boundaries.png & 
	cat docker-compose.yaml | docker run -i funkwerk/compose_plantuml --boundaries --link-graph | docker run -i think/plantuml -tpng > assets/full.png 