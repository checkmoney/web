workflow "Deploy" {
  resolves = [
    "Push front image",
    "Push back image",
  ]
  on = "release"
}

action "Login to Docker" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
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
