![](http://circleci.com/gh/repoOwner/repoName.png?circle-token=1ff3a6f86c4cf8eab85de1a25f989b132d5d3eb5)

# Project Name

> Essoteegee

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Contributing](#contributing)
1. [Style Guide](#style-guide)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Docker](#docker)
  1. [Common Docker Error Messages](#common-docker-error-messages)
1. [Team](#team)

## Usage

> Some usage instructions

## Development

### Requirements

- Node 0.10.x
- MySQL

### Installing Dependencies

- ``sudo npm install -g bower``
- ``npm install``
- ``bower install``
- Good to go


### Initialize Dev Environment
- Copy start.example.sh to start.sh and edit the environment variables to match your local machine
- Copy config.example.js to config.js and edit the config variables to match your local machine (You may have to run ``chmod +x start.sh`` if you create a new file instead of copying the example file)
- Run ``grunt test`` to run tests
- Run ``npm start`` to launch server
- The console will tell you what port the server is running on

### Environment Variables

- Tweet Handler Server
  - RDS_HOSTNAME
  - RDS_USERNAME
  - RDS_PASSWORD
  - RDS_DB_NAME
  - API_ADDRESS
- Stream Server
  - HANDLER_ADDRESS
  - HANDLER_PORT
  - API_ADDRESS

### Connecting to Elastic Beanstalk Instances
- Find the IP address of the environment in the EC2 Instances console of the AWS management page.
- ``ssh -i ~/path/to/username.pem ec2-user@ip-address``

## Contributing
1. Fork
  - Clone from your GitHub fork
  - Set this repo as your upstream remote with ''git remote add upstream https://github.com/NaiveBrontosaurus/sotg.git''
1. Create namespaced feature branch from master
  - bug/...
  - feat/...
  - test/...
  - dock/...
  - refactor/...
1. Make commits to feature branch. Prefix each commit like so:
  - (feat) Add a new feature
  - (fix) Fix inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature
  - Rebase upstream changes into your branch.
  - Submit a pull request directly to master. Include description of changes.
  - Your pull request will be reviewed by another maintainer.
  - Fix any issues raised by reviewer and push fixes as single commit.
  - Once pull request has been reviewed, it will be merged by another member. Do not merge yoru own commits. 

## Style Guide
- Two space indents
- Newline at end of file
- Not specified above: [Crockford's Style](http://javascript.crockford.com/code.html)

### Docker
- If you're using Mac, you'll have to install boot2docker and docker: https://docs.docker.com/installation/mac/
- Download the [Boot2Docker-x.x.x.pkg](https://github.com/boot2docker/osx-installer/releases/tag/v1.7.0) file.
- Install Boot2Docker by double-clicking the package.
  - The installer places Boot2Docker and VirtualBox in your "Applications" folder.
  - The ``docker`` and ``boot2docker`` binaries will be in your ``/usr/local/bin`` directory.
- __To run docker from the command line__
  1. Create a new Boot2Docker virtual machine
    - ``boot2docker init``
  2. Start the ``boot2docker`` VM.
    - ``boot2docker start``
  3. Display the environment variables for the Docker client.
    - ``boot2docker shellinit``
  4. Set the environment variables in your shell with the following:
    - ``$(boot2docker shellinit)``
  5. Run the hello-world container to verify your setup.
    - ``docker run hello-world``

#### Common Docker Error Messages

- [ERROR] InnoDB: Cannot allocate memory for the buffer pool
  - You might receive this error while trying to start the MySQL server on a VPS with limited resourcs (such as a $5 DigitalOcean droplet.
  - This is caused by not having enough memory. The solution https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04
- MySQL ERROR! The server quit without updating PID file...
  - Seems to be fixed with a reboot.
  - This could be because of an edit to your my.cnf file that MySQL is unhappy with.
  - It could also be for some other reason I haven't been able to narrow down.
- ...dial unix /var/run/docker.sock: no such file or directory. Are you trying to connect to a TLS-enabled daemon without TLS?...
  - Started getting this after a boot2docker upgrade.
  - After running $(boot2docker shellinit) I got a different error: An error occurred trying to connect: Get https://192.168.59.103:2376/v1.19/containers/json: x509: certificate is valid for 127.0.0.1, 10.0.2.15, not 192.168.59.103
  - __*Fixed with*__ restarting the docker service inside boot2docker -- ``boot2docker ssh 'sudo /etc/init.d/docker restart'

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
