# target-dummy

This project was created from a personal need to be able to test that API requests were being made from an unfamiliar code project. It allows you to log the contents of those requests to a docker instance. It has been configured to run inside of docker with minimal configuration required.

Out of the box it only contains a few endpoints. Extending this project to include more endpoint functionality is planned when I find the time.

## External Requirements

Configurations for using this project with `docker-compose` are included. With docker and docker-compose installed, you can start the project with `./run.sh dev up` and start the log output to terminal with `./log.sh dev -f` (the `-f` continues displaying new logs as the program is run)

The docker-compose configuration is provided in `compose/dev.yml`. The main node project is started within a docker container, as well as a container for 'swagger' tests. The swagger configuration in `node/swagger/api.yml` will have to be edited to include new endpoints that you decide to add to this project.
