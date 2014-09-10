TESTS = test/*.test.js
REPORTER = tap
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install --registry=http://registry.npm.taobao.org

totoro:
	@node_modules/.bin/totoro --runner test/test-path.js -b 'windowsXP/node/0.10,windowsXP/node/0.11'

autod: install
	@node_modules/.bin/autod -w -e example.js --prefix=~
	@$(MAKE) install

.PHONY: test
