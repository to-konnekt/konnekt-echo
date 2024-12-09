IMAGE_NAME=konnekt-echo
CONTAINER_NAME=konnekt-echo-container
PORT=3000

build:
	@echo "Building Docker image..."
	@docker build -t $(IMAGE_NAME) .

clean:
	@echo "Stopping and removing any existing container..."
	@docker stop $(CONTAINER_NAME) || true
	@docker rm $(CONTAINER_NAME) || true

run: clean
	@echo "Running Docker container..."
	@docker run -d --name $(CONTAINER_NAME) -p $(PORT):3000 $(IMAGE_NAME)

.PHONY: build clean run