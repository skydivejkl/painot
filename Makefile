export PATH := node_modules/.bin:$(PATH)
export SHELL := /bin/bash # Required for OS X for some reason
bundle = dist/bundle.js service-worker.js
rev = $(shell git rev-parse HEAD)


all: dist-changes-hide yarn js

yarn:
	yarn


js:
	NODE_ENV=production webpack -p --progress

service-worker:
	sw-precache --config sw-precache-config.js

server:
	python -m SimpleHTTPServer 8080

js-server:
	webpack-dev-server -d --progress --inline --port 8080 --host 0.0.0.0
	
dist-changes-hide:
	git update-index --assume-unchanged $(bundle)

dist-changes-show:
	git update-index --no-assume-unchanged $(bundle)

update-cache-key:
	sed  -i -re 's/(.*cache=)([a-z0-9]+)(.*)/\1$(rev)\3/' index.html

assert-clean-git: dist-changes-show
	git checkout $(bundle)
	@test -z "$(shell git status . --porcelain)" || (echo "Dirty git tree: " && git status . --porcelain ; exit 1)

commit-bundle: assert-clean-git js dist-changes-show update-cache-key service-worker
	git add $(bundle) index.html
	git status . --porcelain
	git commit -m "Commit bundle"
	$(MAKE) dist-changes-hide
