#!/bin/bash

# Frontend Test Script
# This script tests the frontend server and end-to-end connectivity

set -e

echo "================================"
echo "Frontend Test Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_URL="https://frontend-morphvm-hc5yreuu.http.cloud.morph.so"
BACKEND_URL="https://backend-morphvm-hc5yreuu.http.cloud.morph.so"

pass_count=0
fail_count=0

# Test function
test_endpoint() {
    local test_name="$1"
    local url="$2"
    local expected_status="$3"
    local check_pattern="$4"
    
    echo -n "Testing: $test_name ... "
    
    response=$(curl -s -w "\n%{http_code}" "$url")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" == "$expected_status" ]; then
        if [ -n "$check_pattern" ]; then
            if echo "$body" | grep -q "$check_pattern"; then
                echo -e "${GREEN}✓ PASS${NC}"
                ((pass_count++))
                return 0
            else
                echo -e "${RED}✗ FAIL${NC} (Pattern not found: $check_pattern)"
                echo "Response body: $body"
                ((fail_count++))
                return 1
            fi
        else
            echo -e "${GREEN}✓ PASS${NC}"
            ((pass_count++))
            return 0
        fi
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $http_code)"
        ((fail_count++))
        return 1
    fi
}

echo "1. Frontend Server Tests"
echo "========================"
test_endpoint "Frontend home page" "$FRONTEND_URL/" "200" "Hello World Application"
test_endpoint "Frontend CSS file" "$FRONTEND_URL/styles.css" "200" "body {"
test_endpoint "Frontend JS file" "$FRONTEND_URL/app.js" "200" "fetchHelloMessage"
test_endpoint "Frontend health check" "$FRONTEND_URL/health" "200" "healthy"

echo ""
echo "2. Backend Server Tests"
echo "======================="
test_endpoint "Backend API endpoint" "$BACKEND_URL/api/hello" "200" "Hello, World!"
test_endpoint "Backend health check" "$BACKEND_URL/health" "200" "healthy"

echo ""
echo "3. CORS Configuration Tests"
echo "============================"
echo -n "Testing: CORS headers on backend ... "
cors_header=$(curl -s -I "$BACKEND_URL/api/hello" | grep -i "access-control-allow-origin" || echo "")
if [ -n "$cors_header" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    echo "  CORS header: $cors_header"
    ((pass_count++))
else
    echo -e "${RED}✗ FAIL${NC} (CORS header not found)"
    ((fail_count++))
fi

echo ""
echo "4. File Serving Tests"
echo "====================="
# Check if static files are served with correct content types
echo -n "Testing: CSS content type ... "
css_type=$(curl -s -I "$FRONTEND_URL/styles.css" | grep -i "content-type" | grep -i "text/css" || echo "")
if [ -n "$css_type" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((pass_count++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((fail_count++))
fi

echo -n "Testing: JS content type ... "
js_type=$(curl -s -I "$FRONTEND_URL/app.js" | grep -i "content-type" | grep -i "javascript" || echo "")
if [ -n "$js_type" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((pass_count++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((fail_count++))
fi

echo ""
echo "5. Response Time Tests"
echo "======================"
echo -n "Testing: Frontend response time ... "
frontend_time=$(curl -s -o /dev/null -w "%{time_total}" "$FRONTEND_URL/")
echo -e "${GREEN}✓${NC} $frontend_time seconds"

echo -n "Testing: Backend response time ... "
backend_time=$(curl -s -o /dev/null -w "%{time_total}" "$BACKEND_URL/api/hello")
echo -e "${GREEN}✓${NC} $backend_time seconds"

echo ""
echo "6. Process Status"
echo "================="
echo "Backend processes:"
ps aux | grep "[n]ode server.js" || echo "  No backend process found"

echo ""
echo "Frontend processes:"
ps aux | grep "[n]ode frontend-server.js" || echo "  No frontend process found"

echo ""
echo "================================"
echo "Test Summary"
echo "================================"
echo -e "Passed: ${GREEN}$pass_count${NC}"
echo -e "Failed: ${RED}$fail_count${NC}"
echo ""

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    echo "Frontend URL: $FRONTEND_URL"
    echo "Backend URL: $BACKEND_URL"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    exit 1
fi

