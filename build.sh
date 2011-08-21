#!/bin/sh
 
CHROME=`which chrome`

${CHROME} --no-message-box --pack-extension=social-hotness --pack-extension-key=social-hotness.pem
exit 0
