{ config, ... }:

{
  dotenv.enable = true;

  # Bind together React and Express
  services.caddy = {
    enable = true;
    ca = null;
    config = ''
    :8080 {
      route /api/* {
        reverse_proxy localhost:${config.env.BACKEND_PORT}
      }
      route /* {
        reverse_proxy localhost:${config.env.FRONTEND_PORT}
      }
    }
    '';
  };

  # See full reference at https://devenv.sh/reference/options/
}
