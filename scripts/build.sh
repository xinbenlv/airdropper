#!/bin/sh
echo "Building Loopback SDK"
./node_modules/.bin/lb-sdk server/server ../airdropper-client/client/src/loopbacksdk -d ng2web -i disabled -v enabled
echo "Done!"
exit
