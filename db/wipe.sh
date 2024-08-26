# Stop all running containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Optionally, remove all volumes
docker volume rm $(docker volume ls -q)
