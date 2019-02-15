workflow "Deploy" {
  resolves = ["Build back conteiner", "Build front container"]
  on = "release"
}

action "Login to Docker" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}

action "Build back conteiner" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t checkmoney-back -f Dockerfile-back ."
  needs = ["Login to Docker"]
}

action "Build front container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t checkmoney-front -f Dockerfile-front ."
  needs = ["Login to Docker"]
}
