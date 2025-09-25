SHELL := /bin/sh

# Settings for Python backend local testing
BACKEND_DIR := backend
VENV := $(BACKEND_DIR)/.venv
# Prefer Python 3.11 if available, else fallback to python3
PYTHON ?= $(shell if command -v python3.11 >/dev/null 2>&1; then echo python3.11; else echo python3; fi)
VENV_BIN := $(VENV)/bin
VENV_BIN_REL := .venv/bin
PIP_INDEX_URL ?= https://pypi.org/simple

.PHONY: help build up down test install-backend-dev venv pip-tools build-backend build-frontend up-backend up-frontend stop-backend stop-frontend logs ps restart clean

help:
	@echo "Targets:"
	@echo "  build                Build all Docker images for backend and frontend"
	@echo "  up                   Start services (detached)"
	@echo "  down                 Stop and remove services"
	@echo "  build-backend        Build only backend image"
	@echo "  build-frontend       Build only frontend image"
	@echo "  up-backend           Start only backend"
	@echo "  up-frontend          Start only frontend"
	@echo "  stop-backend         Stop backend container"
	@echo "  stop-frontend        Stop frontend container"
	@echo "  install-backend-dev  Install backend dev deps locally"
	@echo "  test                 Run backend tests locally (pytest)"

build:
	docker compose build --no-cache

build-backend:
	docker compose build backend

build-frontend:
	docker compose build frontend

up:
	docker compose up -d

up-backend:
	docker compose up -d backend

up-frontend:
	docker compose up -d frontend

down:
	docker compose down

stop-backend:
	docker compose stop backend

stop-frontend:
	docker compose stop frontend

venv:
	@# Ensure we're using Python >= 3.11
	@$(PYTHON) -c 'import sys; import platform; sys.exit(0 if sys.version_info >= (3,11) else 1)' || ( \
		echo "Error: Python 3.11+ required. Current: $$($(PYTHON) -V)"; \
		echo "Hint: brew install python@3.11 && PYTHON=python3.11 make test"; \
		exit 2 \
	)
	@# If a venv exists but is on an older Python, recreate it with the selected interpreter
	@if [ -x "$(VENV_BIN)/python" ]; then \
		$(VENV_BIN)/python -c 'import sys; sys.exit(0 if sys.version_info >= (3,11) else 1)'; \
		if [ $$? -ne 0 ]; then \
			echo "Existing venv uses an older Python ($$($(VENV_BIN)/python -V)). Recreating with $$($(PYTHON) -V)"; \
			rm -rf "$(VENV)"; \
		fi; \
	fi
	@if [ ! -d "$(VENV)" ]; then \
		cd $(BACKEND_DIR) && $(PYTHON) -m venv .venv; \
		echo "Created virtualenv at $(VENV) using $$($(PYTHON) -V)"; \
	fi

pip-tools: venv
	$(VENV_BIN)/python -m pip install -U pip setuptools wheel -i $(PIP_INDEX_URL)

install-backend-dev: pip-tools
	$(VENV_BIN)/python -m pip install -r $(BACKEND_DIR)/requirements.txt -i $(PIP_INDEX_URL)
	$(VENV_BIN)/python -m pip install -r $(BACKEND_DIR)/requirements-dev.txt -i $(PIP_INDEX_URL)

test: install-backend-dev
	$(VENV_BIN)/pytest -q $(BACKEND_DIR)
