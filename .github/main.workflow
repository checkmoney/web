workflow "Check PR" {
  on = "pull_request"
  resolves = [
    "Check types",
    "Static analysis",
  ]
}

action "Install dependency" {
  uses = "borales/actions-yarn@master"
  runs = "install"
}

action "Static analysis" {
  uses = "borales/actions-yarn@master"
  runs = "lint"
  needs = ["Install dependency"]
}

action "Check types" {
  uses = "borales/actions-yarn@master"
  runs = "types"
  needs = ["Install dependency"]
}
