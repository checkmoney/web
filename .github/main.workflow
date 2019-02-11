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
