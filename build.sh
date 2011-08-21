#!/bin/sh
 
CHROME=`which chrome`
${CHROME} --no-message-box --pack-extension=social-hotness --pack-extension-key=social-hotness.pem

echo 'Remember to bump version numbers in manifest.json and updates.xml!'
