ECHO "[COMPILING]"
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $DIR
uglifyjs public/js/openplatform.js --config-file minify.json -o public/openplatform.min.js