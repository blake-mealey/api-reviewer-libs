ROOT=$PWD/node_modules/monaco-editor/esm/vs
OPTS="--no-source-maps --log-level 1"        # Parcel options - See: https://parceljs.org/cli.html

parcel build $ROOT/language/json/json.worker.js $OPTS
parcel build $ROOT/editor/editor.worker.js $OPTS