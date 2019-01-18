install:
	docker-compose	-f docker-compose.builder.yml run --rm install
dev:
	docker-compose up