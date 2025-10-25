#!/bin/bash

# Backend Testing Script
echo "=========================================="
echo "Testing Hello World Backend API"
echo "=========================================="
echo ""

BASE_URL="https://backend-morphvm-hc5yreuu.http.cloud.morph.so"

# Test 1: Root endpoint
echo "Test 1: Root endpoint (GET /)"
response=$(curl -s -w "\nSTATUS:%{http_code}" "$BASE_URL/")
echo "$response"
echo ""

# Test 2: Hello endpoint
echo "Test 2: Hello World endpoint (GET /api/hello)"
response=$(curl -s -w "\nSTATUS:%{http_code}" "$BASE_URL/api/hello")
echo "$response"
echo ""

# Test 3: Health endpoint
echo "Test 3: Health check endpoint (GET /health)"
response=$(curl -s -w "\nSTATUS:%{http_code}" "$BASE_URL/health")
echo "$response"
echo ""

# Test 4: 404 handling
echo "Test 4: Non-existent endpoint (GET /nonexistent)"
response=$(curl -s -w "\nSTATUS:%{http_code}" "$BASE_URL/nonexistent")
echo "Response truncated... STATUS: $(echo "$response" | grep STATUS)"
echo ""

# Test 5: CORS headers
echo "Test 5: CORS headers"
curl -I -s "$BASE_URL/api/hello" | grep -i "access-control"
echo ""

echo "=========================================="
echo "All tests completed!"
echo "=========================================="

