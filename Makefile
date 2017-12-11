PROJECT=k
SRC=$(wildcard lib/*.js)

build: node_modules $(SRC)
	mkdir -p build
	browserify --require ./lib/index.js:$(PROJECT) --outfile build/build.js
	browserify test/test.js --outfile build/test.js

node_modules: package.json
	npm install && touch $@

lint:
	jshint $(SRC)

clean:
	rm -fr build node_modules

test: build
	@xdg-open test/index.html

.PHONY: clean lint build
