.PHONY: dist test

dev:
	@npm start

dist:
	@npm run build

deploy:
	@npm run build
