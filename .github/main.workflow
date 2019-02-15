workflow "Check PR" {
  on = "pull_request"
  resolves = [
    "Check types",
    "Static analysis",
    "Check circular dependency",
  ]
}

action "Install dependency" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Static analysis" {
  uses = "borales/actions-yarn@master"
  needs = ["Install dependency"]
  args = "lint"
}

action "Check types" {
  uses = "borales/actions-yarn@master"
  needs = ["Install dependency"]
  args = "types"
}

action "Check circular dependency" {
  uses = "borales/actions-yarn@master"
  needs = ["Install dependency"]
  args = "circular"
}

workflow "Deploy" {
  resolves = [
    "Push back image",
    "Check deploy front successful",
    "Check deploy back success",
  ]
  on = "release"
}

action "Login to Docker" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  secrets = [
    "DOCKER_PASSWORD",
    "DOCKER_USERNAME",
  ]
}

action "Build back image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t igorkamyshev/checkmoney-back -f Dockerfile-back ."
  needs = ["Login to Docker"]
}

action "Build front image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t igorkamyshev/checkmoney-front -f Dockerfile-front ."
  needs = ["Login to Docker"]
}

action "Push back image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "push igorkamyshev/checkmoney-back"
  needs = ["Build back image"]
}

action "Push front image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "push igorkamyshev/checkmoney-front"
  needs = ["Build front image"]
}

action "Deploy on server" {
  uses = "maddox/actions/ssh@master"
  needs = ["Push front image", "Push back image"]
  args = "cd /root/web/checkmoney && docker-compose pull && docker-compose down && docker-compose up -d && docker image prune -f"
  secrets = ["HOST", "USER", "PUBLIC_KEY", "PRIVATE_KEY"]
}

action "Check deploy front successful" {
  uses = "maddox/actions/wait-for-200@master"
  needs = ["Deploy on server"]
  env = {
    URL = "https://checkmoney.space"
    SECONDS_BETWEEN_CHECKS = "2"
    MAX_TRIES = "5"
  }
}

action "Check deploy back success" {
  uses = "maddox/actions/wait-for-200@master"
  needs = ["Deploy on server"]
  env = {
    URL = "https://api.checkmoney.space/docs/"
    SECONDS_BETWEEN_CHECKS = "2"
  }
}
