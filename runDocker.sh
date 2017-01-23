#!/bin/bash

docker build . -t shouty.js

docker run -it -v `pwd`:/shouty.js shouty.js /bin/bash
