run-stores:
	cd store && docker compose -f stack.yml up -d
	timeout 10
run-services:
	docker compose -f stack.yml up --build --force-recreate
run: run-stores run-services
