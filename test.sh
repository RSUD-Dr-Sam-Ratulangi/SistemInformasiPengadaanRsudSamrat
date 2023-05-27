#!/bin/sh

echo "Running tests..."

# Run Java tests
mvn clean test

# Check if Java tests failed
if [ $? -ne 0 ]; then
    echo "Java tests failed. Push aborted."
    exit 1
fi

# Run React tests
cd FrontendRSReact
npm install
npm run test

# Check if React tests failed
if [ $? -ne 0 ]; then
    echo "React tests failed. Push aborted."
    exit 1
fi

# Run Vue tests
cd ../FrontendVendorVue
npm install
npm run test

# Check if Vue tests failed
if [ $? -ne 0 ]; then
    echo "Vue tests failed. Push aborted."
    exit 1
fi

echo "All tests passed. Proceeding with the push."
exit 0
