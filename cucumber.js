module.exports = {
  default: '--coffee --format pretty',
  ci: '--no-snippets --format progress --tags ~@wip',
  annoying: '--no-snippets --format progress --tags @slow --tags @unstable',
}
