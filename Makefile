.PHONY: dist test build

build:
	@npm run build

# 由于集成了 docsify 目前需要启两个服务
# 先 make docsify
docsify:
	docsify serve src/docs

# 然后新开一个 console
# make dev
dev:
	@npm start
