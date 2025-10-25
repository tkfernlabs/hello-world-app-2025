#!/bin/bash
echo "=== Final Comprehensive Test ==="
echo ""

echo "1. Backend API Test:"
curl -s https://backend-morphvm-hc5yreuu.http.cloud.morph.so/api/hello | head -c 100
echo ""
echo ""

echo "2. Backend 404 Handler Test:"
curl -s https://backend-morphvm-hc5yreuu.http.cloud.morph.so/nonexistent | head -c 150
echo ""
echo ""

echo "3. Frontend Main Page Test:"
curl -s https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/ | grep -o "<title>.*</title>"
echo ""

echo "4. Frontend Favicon Test:"
curl -I https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/favicon.ico 2>&1 | grep -E "(HTTP|content-type)"
echo ""

echo "5. Frontend Caching Test:"
curl -I https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/styles.css 2>&1 | grep "cache-control"
echo ""

echo "6. Backend Logs Test:"
ls -lh /root/hello-world-app/logs/ 2>&1 | tail -1
echo ""

echo "7. Server Process Test:"
ps aux | grep -E "node.*server" | grep -v grep | wc -l
echo " server processes running"
echo ""

echo "=== All Tests Complete ==="
