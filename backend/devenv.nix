{ config, ... }:

let
  root = "${config.env.DEVENV_ROOT}/backend";
  # user = config.env.DATABASE_USER;
  # pass = config.env.DATABASE_PASS;
  # port = config.env.DATABASE_PORT;
in
{
  # https://devenv.sh/languages
  languages.javascript = {
    enable = true;
    bun.enable = true;
  };
  languages.typescript.enable = true;

  # https://devenv.sh/services/
  # services.mongodb = {
  #   enable = true;
  #   additionalArgs = [
  #     "--port"
  #     "${port}"
  #     "--noauth"
  #   ];
  #   initDatabaseUsername = user;
  #   initDatabasePassword = pass;
  # };

  tasks = {
    "backend:getDependencies" = {
      exec = "bun install --cwd ${root}";
      status = "test -d ${root}/node_modules";
      before = [ "devenv:enterShell" "devenv:enterTest" ];
    };
  };

  processes.backend.exec = ''
    bun run --cwd ${root} dev
  '';

  enterTest = ''
    bun run --cwd ${root} test
  '';
}
