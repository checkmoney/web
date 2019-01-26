workflow "Check PR" {
  on = "pull_request"
  resolves = ["borales/actions-yarn@master-1", "Install dependency", "Check types"]
}

action "Install dependency" {
  uses = "borales/actions-yarn@master"
  runs = "install"
}

action "borales/actions-yarn@master-1" {
  uses = "borales/actions-yarn@master"
  runs = "Static analysis"
  needs = ["Install dependency"]
}

action "Check types" {
  uses = "borales/actions-yarn@master"
  runs = "types"
  needs = ["Install dependency"]
}
