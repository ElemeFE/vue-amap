.PHONY: dist test

dev:
	@npm start

dist:
	@npm run build

deploy:
	@npm run deploy

test:
	@npm test
