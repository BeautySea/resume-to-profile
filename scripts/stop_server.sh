#!/bin/bash

# Stop all PM2 processes. If no process exists, ignore the error.

pm2 stop all || true
