{ pkgs, config, ... }:

let
  root = "${config.env.DEVENV_ROOT}/frontend";
in
{
  # https://devenv.sh/packages/
  packages = with pkgs; [
    rustywind # Organize Tailwind CSS classes
    tailwindcss-language-server
  ];

  # https://devenv.sh/languages
  languages.javascript = {
    enable = true;
    bun.enable = true;
  };
  languages.typescript.enable = true;

  # tasks = {
  #   "frontend:getDependencies" = {
  #     exec = "bun install --cwd ${root}";
  #     status = "test -d ${root}/node_modules";
  #     before = [ "devenv:enterShell" "devenv:enterTest" ];
  #   };
  # };

  processes.frontend.exec = ''
    bun run --cwd ${root} dev --port ${port}
  '';

  enterTest = ''
    bun run --cwd ${root} test
  '';
}
